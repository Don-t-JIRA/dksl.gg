package com.ssafy.dksl.model.service;

// Command
import com.ssafy.dksl.model.dto.command.TeamMemberCommand;
import com.ssafy.dksl.model.dto.command.SearchTeamCommand;
import com.ssafy.dksl.model.dto.command.CreateTeamCommand;

// Response
import com.ssafy.dksl.model.dto.response.SummonerResponse;
import com.ssafy.dksl.model.dto.response.TeamDetailResponse;
import com.ssafy.dksl.model.dto.response.TeamResponse;

// Entity
import com.ssafy.dksl.model.dto.response.TierResponse;
import com.ssafy.dksl.model.entity.Team;
import com.ssafy.dksl.model.entity.Member;
import com.ssafy.dksl.model.entity.MemberTeam;

// Repository
import com.ssafy.dksl.model.repository.MemberTeamRepository;
import com.ssafy.dksl.model.repository.TeamRepository;
import com.ssafy.dksl.model.repository.MemberRepository;
import com.ssafy.dksl.model.repository.TierRepository;

import com.ssafy.dksl.util.JwtUtil;
import com.ssafy.dksl.util.exception.*;
import com.ssafy.dksl.util.exception.common.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
public class TeamServiceImpl implements TeamService {
    private final JwtUtil jwtUtil;

    private final String BASE_IMG_URI;

    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;
    private final MemberTeamRepository memberTeamRepository;
    private final TierRepository tierRepository;

    @Autowired
    public TeamServiceImpl(JwtUtil jwtUtil, @Value("${base.img.uri}") String baseImgUri, TeamRepository teamRepository, MemberRepository memberRepository, MemberTeamRepository memberTeamRepository, TierRepository tierRepository) {
        this.jwtUtil = jwtUtil;
        this.BASE_IMG_URI = baseImgUri;

        this.teamRepository = teamRepository;
        this.memberRepository = memberRepository;
        this.memberTeamRepository = memberTeamRepository;
        this.tierRepository = tierRepository;
    }

    @Override
    public boolean createTeam(CreateTeamCommand createTeamCommand) throws CustomException {
        Member chairman = memberRepository
                .findByClientId(jwtUtil.getClientId(createTeamCommand.getAccessToken()))
                .orElseThrow(MemberNotFoundException::new);

        // 확장자명 검사
        String contentType = null;
        try {
            contentType = createTeamCommand.getImg().getContentType();  // 이미지 확장자명 찾기
        } catch(Exception e) {
            log.error(e.getMessage());
            throw new FileNotFoundException();
        }
        String originalFileExtension;

        if (contentType == null || contentType.trim().equals("")) {
            throw new FileNotFoundException();
        }

        if (contentType.contains("image/jpeg")) originalFileExtension = ".jpg";
        else if (contentType.contains("image/png")) originalFileExtension = ".png";
        else throw new FileNotFoundException();
        try {
            Team team = Team.builder()
                    .name(createTeamCommand.getName())
                    .description(createTeamCommand.getDescription())
                    .chairman(chairman)
                    .submitAt(LocalDateTime.now())
                    .img("tmp")  // 임시 img 이름
                    .build();
            team = teamRepository.save(team);  // ID를 받기 위한 임시 저장
            boolean flag = createTeamMember(TeamMemberCommand.builder().token(createTeamCommand.getAccessToken()).teamName(createTeamCommand.getName()).build());
            if(!flag) throw new MemberTeamCreateException();

            String imgName = team.getId() + originalFileExtension;
            File imgFile = new File(BASE_IMG_URI + "team" + File.separator + imgName);
            flag = imgFile.setExecutable(false);  // 실행 권한 없애기
            createTeamCommand.getImg().transferTo(imgFile);  // 이미지 저장

            team = Team.builder()
                    .id(team.getId())
                    .name(team.getName())
                    .description(team.getDescription())
                    .chairman(chairman)
                    .submitAt(null)
                    .img(imgName)  // 실제 이미지 이름으로 다시 저장
                    .build();

            teamRepository.save(team);


            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new TeamCreateException();
        }
    }

    @Override
    public boolean createTeamMember(TeamMemberCommand teamMemberCommand) throws CustomException {
        Member member = memberRepository.findByClientId(jwtUtil.getClientId(teamMemberCommand.getToken())).orElseThrow(MemberNotFoundException::new);
        Team team = teamRepository.findByNameAndSubmitAtIsNotNull(teamMemberCommand.getTeamName()).orElseThrow(TeamNotFoundException::new);

        try {
            memberTeamRepository.save(MemberTeam.builder().member(member).team(team).build());

            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new MemberTeamCreateException();
        }
    }

    @Override
    public boolean leaveTeamMember(TeamMemberCommand teamMemberCommand) throws CustomException {
        Member member = memberRepository.findByClientId(jwtUtil.getClientId(teamMemberCommand.getToken())).orElseThrow(MemberNotFoundException::new);
        Team team = teamRepository.findByNameAndSubmitAtIsNotNull(teamMemberCommand.getTeamName()).orElseThrow(TeamNotFoundException::new);

        try {
            memberTeamRepository.delete(MemberTeam.builder().member(member).team(team).build());
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new MemberTeamDeleteException();
        }
    }

    @Override
    public List<TeamResponse> getTeamList(List<Team> teamList) throws CustomException {
        List<TeamResponse> teamResponseList = new ArrayList<>();
        for (Team team : teamList) {
            // 이미지 변환
            byte[] imageByteArray = imgToByteArray(team.getImg());

            // 팀의 평균 티어 계산

            try {
                teamResponseList.add(TeamResponse.builder()
                        .name(team.getName())
                        .description(team.getDescription())
                        .imgByteArray(imageByteArray)
                        .tierResponse(calAvgTier(team.getMembers()))
                        .build());
            } catch (Exception e) {
                log.error(e.getMessage());
                throw new TeamInvalidException();
            }
        }

        return teamResponseList;
    }

    public List<TeamResponse> getAllTeamList() throws CustomException {
        List<Team> teamList = new ArrayList<>();
        try {
            teamList = teamRepository.findAllBySubmitAtIsNotNullOrderByNameAsc();
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new TeamInvalidException();
        }
        return getTeamList(teamList);
    }

    public List<TeamResponse> getOrderTeamList() throws CustomException {
        List<TeamResponse> teamResponseList = new ArrayList<>();
        try {
            teamResponseList = getAllTeamList();
            teamResponseList.sort((o1, o2) -> o2.getTierResponse().getOrderNum() - o1.getTierResponse().getOrderNum());
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new TeamInvalidException();
        }
        return teamResponseList;
    }

    public List<TeamResponse> getRecentTeamList() throws CustomException {
        List<MemberTeam> memberTeamList = new ArrayList<>();
        List<Team> teamList = new ArrayList<>();

        try {
            memberTeamList = memberTeamRepository.findAllByOrderByUpdatedAtDesc();
        } catch (DataAccessException e) {
            log.error(e.getMessage());
            throw new TeamInvalidException();
        }

            boolean flag;
            for (MemberTeam memberTeam : memberTeamList) {
                flag = true;
                for (Team team : teamList) {
                    if (team.getName().equals(memberTeam.getTeam().getName())) {  // 중복 제거
                        flag = false;
                        break;
                    }
                }

                if (flag) teamList.add(memberTeam.getTeam());  // 중복 아니면 add
                if (3 <= teamList.size()) break;  // 길이 3 채워지면 break
            }

            return getTeamList(teamList);
    }

    @Override
    public List<TeamResponse> getSearchTeamList(SearchTeamCommand searchTeamCommand) throws CustomException {
        if(searchTeamCommand.getSearchStr().trim().equals("")) throw new NotFoundException("검색어");
        List<Team> teamList;
        try {
            teamList = teamRepository
                    .findAllByNameContainingOrDescriptionContainingAndSubmitAtIsNotNull(searchTeamCommand.getSearchStr().trim(), searchTeamCommand.getSearchStr().trim());
        } catch(DataAccessException e) {
            throw new TeamInvalidException();
        }

        return getTeamList(teamList);
    }

    public List<TeamResponse> getSummonerTeamList(SearchTeamCommand searchTeamCommand) throws CustomException {
        List<MemberTeam> memberTeamList = memberRepository
                .findByName(searchTeamCommand.getSearchStr())
                .orElseThrow(MemberNotFoundException::new)
                .getTeams();

        List<Team> teamList = new ArrayList<>();
        for (MemberTeam team : memberTeamList) {
            teamList.add(team.getTeam());
        }

        return getTeamList(teamList);
    }

    public TeamDetailResponse getTeamDetail(TeamMemberCommand teamMemberCommand) throws CustomException {
        // 회원 확인
        Member member = null;
        if(teamMemberCommand.getToken() != null)
            member = memberRepository.findByClientId(jwtUtil.getClientId(teamMemberCommand.getToken())).orElse(null);

        boolean isJoined = false;

        Team team = teamRepository.findByNameAndSubmitAtIsNotNull(teamMemberCommand.getTeamName()).orElseThrow(TeamNotFoundException::new);
        List<SummonerResponse> summonerResponseList = new ArrayList<>();
        for (MemberTeam memberTeam : team.getMembers()) {
            if(member != null && memberTeam.getMember().getName().equals(member.getName())) isJoined = true;
            summonerResponseList.add(SummonerResponse.builder()
                    .name(memberTeam.getMember().getName())
                            .profileIconId(memberTeam.getMember().getProfileIconId())
                            .tier(memberTeam.getMember().getTier().toTierResponse())
                            .rank(memberTeam.getMember().getRank())
                            .level(memberTeam.getMember().getLevel())
                    .build());
        }
        
        // 티어 별 정렬
        summonerResponseList.sort(Comparator.comparingInt(o -> o.getTier().getOrderNum()));
        if(!isJoined && 10 < summonerResponseList.size())  // 가입 안 되어 있을 경우 10개 짜르기
            summonerResponseList = summonerResponseList.subList(0, 10);

        return TeamDetailResponse.builder()
                .isJoined(isJoined)
                .name(team.getName())
                .chairman(team.getChairman().getName())
                .description(team.getDescription())
                .imgByteArray(imgToByteArray(team.getImg()))
                .tierResponse(calAvgTier(team.getMembers()))
                .summonerResponse(summonerResponseList)
                .build();
    }

    // 이미지를 Byte Array로 변환하는 함수
    private byte[] imgToByteArray(String imgName) throws FileInvalidException {
        // 이미지를 byte array로 변환 (blob)
        byte[] imageByteArray;
        try {
            InputStream imageStream = new FileInputStream(BASE_IMG_URI + "team" + File.separator + imgName);
            imageByteArray = imageStream.readAllBytes();
            imageStream.close();
        } catch (IOException e) {
            log.error("파일 URL : " + BASE_IMG_URI + "team" + File.separator + imgName);
            throw new FileInvalidException();
        }

        return imageByteArray;
    }

    // 평균 티어를 구하는 함수
    private TierResponse calAvgTier(List<MemberTeam> members) {
        double sumTier = 0;
        for (MemberTeam memberTeam : members) {
            sumTier += memberTeam.getMember().getTier().getOrderNum();
        }

        return tierRepository.findByOrderNum((int) (Math.round(sumTier / (double) members.size()))).toTierResponse();  // 평균 티어
    }
}
