package com.ssafy.dksl.controller;

import com.ssafy.dksl.model.dto.command.CreateTeamMemberCommand;
import com.ssafy.dksl.model.dto.command.SearchTeamCommand;
import com.ssafy.dksl.model.dto.request.CreateTeamRequest;
import com.ssafy.dksl.model.dto.response.AllTeamResponse;
import com.ssafy.dksl.model.service.TeamServiceImpl;
import com.ssafy.dksl.util.exception.CreateDataException;
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

    @PostMapping("create")
    private ResponseEntity<?> createTeam(@RequestHeader("Authorization") String token, @RequestBody CreateTeamRequest createTeamRequest) {
        try {
            return ResponseEntity.ok(teamService.createTeam(createTeamRequest.toCreateTeamCommand(token)));
        } catch (CreateDataException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("add")
    private ResponseEntity<?> createTeam(@RequestHeader("Authorization") String token, @RequestBody String teamName) {
        try {
            return ResponseEntity.ok(teamService.createTeamMember(CreateTeamMemberCommand.builder().token(token).teamName(teamName).build()));
        } catch (CreateDataException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    private ResponseEntity<?> getFirstTeamList() {  // 최초 한 번 불러오기
        try {
            AllTeamResponse allTeamResponse = AllTeamResponse.builder()
                    .teamList(teamService.getAllTeamList())  // 모든 팀 리스트
                    .recentTeamList(teamService.getRecentTeamList())  // 최근 가입 팀 리스트
                    .build();
            return ResponseEntity.ok(allTeamResponse);
        } catch (GetDataException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("recent")
    private ResponseEntity<?> getRecentTeamList() {  // 최초 한 번 불러오기
        try {
            return ResponseEntity.ok(teamService.getRecentTeamList());
        } catch (GetDataException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("search")
    private ResponseEntity<?> getSearchTeamList(@RequestParam String searchStr) {
        try {
            return ResponseEntity.ok(teamService.getSearchTeamList(SearchTeamCommand.builder().searchStr(searchStr).build()));
        } catch (GetDataException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
