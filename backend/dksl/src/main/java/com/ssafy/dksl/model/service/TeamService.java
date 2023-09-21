package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.TeamDto;
import com.ssafy.dksl.model.dto.MemberDto;
import com.ssafy.dksl.util.exception.CreateDataException;
import com.ssafy.dksl.util.exception.GetDataException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TeamService {
    boolean createTeam(String token, TeamDto teamDto) throws CreateDataException;
    List<TeamDto> getTeamList() throws GetDataException;
    List<TeamDto> getMyTeamList(String token, MemberDto memberDto) throws GetDataException;
}
