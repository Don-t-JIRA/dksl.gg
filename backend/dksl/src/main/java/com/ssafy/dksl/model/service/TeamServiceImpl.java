package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.command.SearchTeamCommand;
import com.ssafy.dksl.model.dto.command.TeamCommand;
import com.ssafy.dksl.model.dto.response.TeamResponse;
import com.ssafy.dksl.model.entity.Team;
import com.ssafy.dksl.model.entity.Member;
import com.ssafy.dksl.model.entity.MemberTeam;
import com.ssafy.dksl.model.repository.MemberTeamRepository;
import com.ssafy.dksl.model.repository.TeamRepository;
import com.ssafy.dksl.model.repository.MemberRepository;
import com.ssafy.dksl.util.JwtUtil;
import com.ssafy.dksl.util.exception.CreateDataException;
import com.ssafy.dksl.util.exception.GetDataException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Autowired
    public TeamServiceImpl(JwtUtil jwtUtil, TeamRepository teamRepository, MemberRepository memberRepository, MemberTeamRepository memberTeamRepository) {
        this.jwtUtil = jwtUtil;
        this.teamRepository = teamRepository;
        this.memberRepository = memberRepository;
        this.memberTeamRepository = memberTeamRepository;
    }

    @Override
    public boolean createTeam(TeamCommand teamCommand) throws CreateDataException {
        Member chairman = memberRepository.findByClientId(jwtUtil.getClientId(teamCommand.getAccessToken())).orElseThrow(() -> new CreateDataException("회원 조회에 실패 했습니다."));
        try {
            Team team = teamCommand.toTeam(chairman);
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
        List<MemberTeam> memberTeamList = memberTeamRepository.findTop3ByOrderByUpdatedAtDesc();
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
}
