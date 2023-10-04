package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.command.TeamMemberCommand;
import com.ssafy.dksl.model.dto.command.SearchTeamCommand;
import com.ssafy.dksl.model.dto.command.CreateTeamCommand;
import com.ssafy.dksl.model.dto.command.TokenCommand;
import com.ssafy.dksl.model.dto.response.TeamDetailResponse;
import com.ssafy.dksl.model.dto.response.TeamResponse;
import com.ssafy.dksl.model.entity.Team;
import com.ssafy.dksl.util.exception.common.CustomException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TeamService {
    boolean createTeam(CreateTeamCommand createTeamCommand) throws CustomException;
    boolean createTeamMember(TeamMemberCommand teamMemberCommand) throws CustomException;
    boolean leaveTeamMember(TeamMemberCommand teamMemberCommand) throws CustomException;
    List<TeamResponse> getTeamList(List<Team> teamList) throws CustomException;
    List<TeamResponse> getAllTeamList() throws CustomException;
    List<TeamResponse> getRecentTeamList() throws CustomException;
    List<TeamResponse> getTeamRankList() throws CustomException;
    List<TeamResponse> getSearchTeamList(SearchTeamCommand searchTeamCommand) throws CustomException;
    List<TeamDetailResponse> getSummonerTeamList(SearchTeamCommand searchTeamCommand) throws CustomException;
    TeamDetailResponse getTeamDetail(TeamMemberCommand teamMemberCommand) throws CustomException;
}
