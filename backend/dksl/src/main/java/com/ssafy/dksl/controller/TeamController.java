package com.ssafy.dksl.controller;

import com.ssafy.dksl.model.dto.command.TeamMemberCommand;
import com.ssafy.dksl.model.dto.command.SearchTeamCommand;
import com.ssafy.dksl.model.dto.command.TokenCommand;
import com.ssafy.dksl.model.dto.request.CreateTeamRequest;
import com.ssafy.dksl.model.dto.response.AllTeamResponse;
import com.ssafy.dksl.model.dto.response.MyTeamResponse;
import com.ssafy.dksl.model.service.TeamServiceImpl;
import com.ssafy.dksl.util.exception.common.CustomException;
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
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }

    @PostMapping("add")
    private ResponseEntity<?> addTeamMember(@RequestHeader("Authorization") String token, @RequestBody String teamName) {
        try {
            return ResponseEntity.ok(teamService.createTeamMember(TeamMemberCommand.builder().token(token).teamName(teamName).build()));
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }

    @PostMapping("leave")
    private ResponseEntity<?> leaveTeamMember(@RequestHeader("Authorization") String token, @RequestBody String teamName) {
        try {
            return ResponseEntity.ok(teamService.leaveTeamMember(TeamMemberCommand.builder().token(token).teamName(teamName).build()));
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
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
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }

    @GetMapping("summoner")
    private ResponseEntity<?> getSummonerTeamList(@RequestParam String summoner) throws CustomException {
        MyTeamResponse myTeamResponse = MyTeamResponse.builder()
                .myTeamList(teamService.getSummonerTeamList(SearchTeamCommand.builder().searchStr(summoner).build()))
                .orderTeamList(teamService.getOrderTeamList())
                .build();

        return ResponseEntity.ok(myTeamResponse);
    }

    @GetMapping("recent")
    private ResponseEntity<?> getRecentTeamList() {  // 최초 한 번 불러오기
        try {
            return ResponseEntity.ok(teamService.getRecentTeamList());
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }

    @GetMapping("search")
    private ResponseEntity<?> getSearchTeamList(@RequestParam String searchStr) {
        try {
            return ResponseEntity.ok(teamService.getSearchTeamList(SearchTeamCommand.builder().searchStr(searchStr).build()));
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }
}
