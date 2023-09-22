package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.*;
import com.ssafy.dksl.model.dto.command.SearchTeamCommand;
import com.ssafy.dksl.model.dto.response.TeamResponse;
import com.ssafy.dksl.model.entity.Team;
import com.ssafy.dksl.model.entity.Member;
import com.ssafy.dksl.model.entity.MemberTeam;
import com.ssafy.dksl.model.repository.MemberTeamRepository;
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
    private final MemberTeamRepository memberTeamRepository;

    @Autowired
    public TeamServiceImpl(TeamRepository teamRepository, MemberRepository memberRepository, MemberTeamRepository memberTeamRepository) {
        this.teamRepository = teamRepository;
        this.memberRepository = memberRepository;
        this.memberTeamRepository = memberTeamRepository;
    }

    @Override
    public boolean createTeam(String token, TeamDto teamDto) throws CreateDataException {
        /* TO DO : 유효성 검사 진행 */

        return false;
    }

    @Override
    public List<TeamResponse> getTeamList(List<Team> teamList) throws GetDataException {
        // List<Team> teamList = teamRepository.findAll();
        List<TeamResponse> teamResponseList = new ArrayList<>();
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
        return getTeamList(teamRepository.findAll());
    }

    public List<TeamResponse> getRecentTeamList() throws GetDataException {
        List<MemberTeam> memberTeamList = memberTeamRepository.findAllByOrderByUpdatedAtDesc();
        List<Team> teamList = new ArrayList<>();
        for(MemberTeam team : memberTeamList) {
            teamList.add(team.getTeam());
        }

        return getTeamList(teamList);
    }

    @Override
    public List<TeamResponse> getSearchTeamList(SearchTeamCommand searchTeamCommand) throws GetDataException {
        return getTeamList(teamRepository.findAllByNameContainingOrDescriptionContaining(searchTeamCommand.getSearchStr(), searchTeamCommand.getSearchStr()));
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
