package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.*;
import com.ssafy.dksl.model.entity.Team;
import com.ssafy.dksl.model.entity.Member;
import com.ssafy.dksl.model.entity.MemberTeam;
import com.ssafy.dksl.model.repository.TeamRepository;
import com.ssafy.dksl.model.repository.MemberRepository;
import com.ssafy.dksl.util.exception.CreateDataException;
import com.ssafy.dksl.util.exception.GetDataException;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Service
@Slf4j
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public TeamServiceImpl(TeamRepository teamRepository, MemberRepository memberRepository) {
        this.teamRepository = teamRepository;
        this.memberRepository = memberRepository;
    }

    @Override
    public boolean createTeam(String token, TeamDto teamDto) throws CreateDataException {
        /* TO DO : 유효성 검사 진행 */

        return false;
    }

    @Override
    public List<TeamDto> getTeamList() throws GetDataException {
        List<Team> teamList = teamRepository.findAll();
        List<TeamDto> teamDtoList = new ArrayList<>();
        byte[] imageByteArray = null;
            for (Team team : teamList) {
                // 이미지를 byte array로 변환 (blob)
                try {
                    InputStream imageStream = new FileInputStream("C:/SSAFY/FinalTerm/1_workspace/S09P22A703/backend/dksl/src/main/resources/images/team/" + team.getImg());
                    imageByteArray = imageStream.readAllBytes();
                    imageStream.close();
                } catch(IOException e) {
                    log.error("이미지 조회를 실패 했습니다.");
                }

                // User 순위 매기기
                List<MemberTeam> memberTeamList = teamRepository.findById(team.getId()).orElseThrow(() -> new GetDataException("팀원 조회를 실패 했습니다.")).getMembers();
                List<MemberTierDto> memberTierDtoList = new ArrayList<>();

                for (MemberTeam memberTeam : memberTeamList) {
                    TierDto tierDto = TierDto.builder()
                            .id(memberTeam.getMember().getTier().getId())
                            .name(memberTeam.getMember().getTier().getName())
                            .build();

                    memberTierDtoList.add(MemberTierDto.builder()
                            .name(memberTeam.getMember().getName())
                            .tier(tierDto)
                            .rank(memberTeam.getMember().getRank())
                            .build());
                }

                memberTierDtoList.sort((o1, o2) -> {
                    if (o1.getTier().getNum() == o2.getTier().getNum()) return o1.getRank() - o2.getRank();
                    return o1.getTier().getNum() - o2.getTier().getNum();
                });

                try {
                teamDtoList.add(TeamRankDto.builder()
                        .id(team.getId())
                        .name(team.getName())
                        .description(team.getDescription())
                        .imgByteArray(imageByteArray)
                        .memberDtoList(memberTierDtoList)
                        .build());
                } catch (Exception e) {
                    log.error(e.getMessage());
                    throw new GetDataException("팀 조회를 실패 했습니다.");
                }
            }

            return teamDtoList;
    }

    @Override
    public List<TeamDto> getMyTeamList(String token, MemberDto memberDto) throws GetDataException {
        /* TO DO : 유효성 검사 진행 */
        List<TeamDto> teamDtoList = new ArrayList<>();
        Member member = memberRepository.findByClientId(memberDto.getClientId()).orElseThrow(() -> new GetDataException("회원정보가 존재하지 않습니다."));
        try {

            for (MemberTeam memberTeam : member.getTeams()) {
                InputStream imageStream = new FileInputStream("C:/SSAFY/FinalTerm/1_workspace/S09P22A703/backend/dksl/src/main/resources/images/team/" + memberTeam.getTeam().getImg());
                byte[] imageByteArray = null;
                IOUtils.readFully(imageStream, imageByteArray);
                imageStream.close();

                teamDtoList.add(TeamDto.builder()
                        .id(memberTeam.getTeam().getId())
                        .name(memberTeam.getTeam().getName())
                        .description(memberTeam.getTeam().getDescription())
                        .build());
            }

            return teamDtoList;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new GetDataException("나의 팀 조회를 실패 했습니다.");
        }
    }
}
