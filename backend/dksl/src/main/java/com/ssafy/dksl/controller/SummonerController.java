package com.ssafy.dksl.controller;

import com.ssafy.dksl.model.dto.command.team.SearchTeamCommand;
import com.ssafy.dksl.model.dto.response.team.SummonerTeamResponse;
import com.ssafy.dksl.model.service.TeamService;
import com.ssafy.dksl.util.exception.common.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("summoner")
public class SummonerController {
    private final TeamService teamService;

    @Autowired
    public SummonerController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("team/{summonerName}")
    private ResponseEntity<?> getTeam(@PathVariable("summonerName") String summonerName) {
        try {
            SummonerTeamResponse summonerTeamResponse = SummonerTeamResponse.builder()
                    .summonerTeamList(teamService.getSummonerTeamList(SearchTeamCommand.builder().searchStr(summonerName).build()))
                    .teamRankList(teamService.getTeamRankList())
                    .build();
            return ResponseEntity.ok(summonerTeamResponse);
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }
}
