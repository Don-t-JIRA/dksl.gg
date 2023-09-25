package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.command.MyTeamCommand;
import com.ssafy.dksl.model.dto.command.OrderTeamCommand;
import com.ssafy.dksl.model.dto.command.SearchTeamCommand;
import com.ssafy.dksl.model.dto.command.CreateTeamCommand;
import com.ssafy.dksl.model.dto.response.TeamResponse;
import com.ssafy.dksl.model.entity.Team;
import com.ssafy.dksl.model.entity.Member;
import com.ssafy.dksl.model.entity.MemberTeam;
import com.ssafy.dksl.model.repository.MemberTeamRepository;
import com.ssafy.dksl.model.repository.TeamRepository;
import com.ssafy.dksl.model.repository.MemberRepository;
import com.ssafy.dksl.model.repository.TierRepository;
import com.ssafy.dksl.util.JwtUtil;
import com.ssafy.dksl.util.exception.CreateDataException;
import com.ssafy.dksl.util.exception.GetDataException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Service
@Slf4j
public class TeamServiceImpl implements TeamService {
    private final JwtUtil jwtUtil;

    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;
    private final MemberTeamRepository memberTeamRepository;
    private final TierRepository tierRepository;

    @Value("${base.img.uri}")
    private String BASE_IMG_URI;

    @Autowired
    public TeamServiceImpl(JwtUtil jwtUtil, TeamRepository teamRepository, MemberRepository memberRepository, MemberTeamRepository memberTeamRepository, TierRepository tierRepository) {
        this.jwtUtil = jwtUtil;
        this.teamRepository = teamRepository;
        this.memberRepository = memberRepository;
        this.memberTeamRepository = memberTeamRepository;
        this.tierRepository = tierRepository;
    }

    @Override
    public boolean createTeam(CreateTeamCommand createTeamCommand) throws CreateDataException {
        Member chairman = memberRepository.findByClientId(jwtUtil.getClientId(createTeamCommand.getAccessToken())).orElseThrow(() -> new CreateDataException("회원 조회에 실패 했습니다."));

        String contentType = createTeamCommand.getImg().getContentType();
        String originalFileExtension;

        if(contentType == null || contentType.trim().equals("")) {
            throw new CreateDataException("이미지 업로드를 실패 했습니다.");
        }

        if (contentType.contains("image/jpeg")) originalFileExtension = ".jpg";
        else if (contentType.contains("image/png")) originalFileExtension = ".png";
        else throw new CreateDataException("이미지 확장자명을 확인해 주세요.");
        try {
            Team team = Team.builder()
                    .name(createTeamCommand.getName())
                    .description(createTeamCommand.getDescription())
                    .chairman(chairman)
                    .img("tmp")  // 임시 img 이름
                    .build();
            team = teamRepository.save(team);  // ID를 받기 위한 임시 저장

            String imgName = team.getId() + originalFileExtension;
            File imgFile = new File(BASE_IMG_URI + "team" + File.separator + imgName);
            createTeamCommand.getImg().transferTo(imgFile);
            imgFile.setExecutable(false);  // 실행 권한 없애기

            team = Team.builder()
                    .id(team.getId())
                    .name(team.getName())
                    .description(team.getDescription())
                    .chairman(chairman)
                    .img(imgName)  // 실제 이미지 이름으로 다시 저장
                    .build();

            teamRepository.save(team);

            return true;
        } catch(Exception e) {
            log.error(e.getMessage());
            throw new CreateDataException("팀 생성을 실패 했습니다.");
        }
    }

    @Override
    public List<TeamResponse> getTeamList(List<Team> teamList) throws GetDataException {
        List<TeamResponse> teamResponseList = new ArrayList<>();
        byte[] imageByteArray = null;
            for (Team team : teamList) {
                // 이미지를 byte array로 변환 (blob)
                try {
                    InputStream imageStream = new FileInputStream(BASE_IMG_URI + "team" + File.separator + team.getImg());
                    imageByteArray = imageStream.readAllBytes();
                    imageStream.close();
                } catch(IOException e) {
                    log.error("이미지 조회를 실패 했습니다.");
                }

                try {
                    teamResponseList.add(TeamResponse.builder()
                        .name(team.getName())
                        .description(team.getDescription())
                        .imgByteArray(imageByteArray)
                        .build());
                } catch (Exception e) {
                    log.error(e.getMessage());
                    throw new GetDataException("팀 조회를 실패 했습니다.");
                }
            }

            return teamResponseList;
    }

    public List<TeamResponse> getAllTeamList() throws GetDataException {
        try {
            return getTeamList(teamRepository.findAll());
        } catch(Exception e) {
            log.error(e.getMessage());
            throw new GetDataException("팀 조회를 실패 했습니다.");
        }
    }

    public List<TeamResponse> getOrderTeamList() throws GetDataException {
        List<OrderTeamCommand> orderTeamCommandList = memberTeamRepository.findAllOrderByOrderNum();
        System.out.println("팀 : " + orderTeamCommandList.get(0).getTeam().getName());
        System.out.println("평균티어 : " + tierRepository.findByOrderNum(orderTeamCommandList.get(0).getAvgTier()));
        try {
            // Map<String, Object> map = teamRepository.findAllOrderByOrderNum();

            return new ArrayList<>();
        } catch(Exception e) {
            log.error(e.getMessage());
            throw new GetDataException("팀 순위 조회를 실패 했습니다.");
        }
    }

    public List<TeamResponse> getRecentTeamList() throws GetDataException {
        try {
            List<MemberTeam> memberTeamList = memberTeamRepository.findTop3ByOrderByUpdatedAtDesc();
            List<Team> teamList = new ArrayList<>();
            for (MemberTeam team : memberTeamList) {
                teamList.add(team.getTeam());
            }

            return getTeamList(teamList);
        } catch(Exception e) {
            log.error(e.getMessage());
            throw new GetDataException("최근 팀 조회를 실패 했습니다.");
        }
    }

    @Override
    public List<TeamResponse> getSearchTeamList(SearchTeamCommand searchTeamCommand) throws GetDataException {
        return getTeamList(teamRepository.findAllByNameContainingOrDescriptionContaining(searchTeamCommand.getSearchStr(), searchTeamCommand.getSearchStr()));
    }

    public List<TeamResponse> getMyTeamList(MyTeamCommand myTeamCommand) throws GetDataException {
        List<MemberTeam> memberTeamList = memberRepository
                .findByClientId(jwtUtil.getClientId(myTeamCommand.getAccessToken()))
                .orElseThrow(() -> new GetDataException("회원 조회를 실패 했습니다."))
                .getTeams();

        List<Team> teamList = new ArrayList<>();
        for(MemberTeam team : memberTeamList) {
            teamList.add(team.getTeam());
        }

        return getTeamList(teamList);
    }
}
