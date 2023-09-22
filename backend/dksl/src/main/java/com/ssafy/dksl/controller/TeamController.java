package com.ssafy.dksl.controller;

import com.ssafy.dksl.model.dto.command.SearchTeamCommand;
import com.ssafy.dksl.model.dto.response.GetAllTeamResponse;
import com.ssafy.dksl.model.service.TeamServiceImpl;
import com.ssafy.dksl.util.exception.GetDataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("team")
@CrossOrigin
public class TeamController {
    private final TeamServiceImpl teamService;

    @Autowired
    public TeamController(TeamServiceImpl teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    private ResponseEntity<?> getTeamList() {
        try {
            GetAllTeamResponse getAllTeamResponse = GetAllTeamResponse.builder()
                    .teamList(teamService.getAllTeamList())
                    .recentTeamList(teamService.getRecentTeamList())
                    .build();
            return ResponseEntity.ok(getAllTeamResponse);
        } catch (GetDataException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("search")
    private ResponseEntity<?> getSearchTeamList(@RequestParam String searchStr) {
        try {
            return ResponseEntity.ok(teamService.getSearchTeamList(SearchTeamCommand.builder().searchStr(searchStr).build()));
        } catch (GetDataException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
