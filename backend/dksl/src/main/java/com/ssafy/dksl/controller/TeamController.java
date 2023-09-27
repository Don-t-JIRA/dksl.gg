package com.ssafy.dksl.controller;

import com.ssafy.dksl.model.dto.command.TeamMemberCommand;
import com.ssafy.dksl.model.dto.command.SearchTeamCommand;
import com.ssafy.dksl.model.dto.request.CreateTeamRequest;
import com.ssafy.dksl.model.dto.response.AllTeamResponse;
import com.ssafy.dksl.model.service.TeamServiceImpl;
import com.ssafy.dksl.util.exception.common.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("team")
@CrossOrigin
public class TeamController {
    private final TeamServiceImpl teamService;

    @Autowired
    public TeamController(TeamServiceImpl teamService) {
        this.teamService = teamService;
    }

    @PostMapping(value = "create", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    private ResponseEntity<?> createTeam(@RequestHeader("Authorization") String token, @RequestPart(value = "team") CreateTeamRequest createTeamRequest, @RequestPart(value = "img") MultipartFile img) {
        try {
            return ResponseEntity.ok(teamService.createTeam(createTeamRequest.toCreateTeamCommand(token, img)));
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

    @GetMapping("recent")
    private ResponseEntity<?> getRecentTeamList() {  // 최초 한 번 불러오기
        try {
            return ResponseEntity.ok(teamService.getRecentTeamList());
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }

    @GetMapping("search")
    private ResponseEntity<?> getSearchTeamList(@RequestParam(value = "word") String searchStr) {
        try {
            return ResponseEntity.ok(teamService.getSearchTeamList(SearchTeamCommand.builder().searchStr(searchStr).build()));
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }

    @GetMapping("detail")
    private ResponseEntity<?> getTeamDetail(@RequestHeader(value = "Authorization", required = false) String token, @RequestParam("name") String teamName) {
        try {
            return ResponseEntity.ok(teamService.getTeamDetail(TeamMemberCommand.builder().token(token).teamName(teamName).build()));
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }
}
