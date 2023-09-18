package com.ssafy.dksl.controller;

import com.ssafy.dksl.model.dto.ReviewDto;
import com.ssafy.dksl.model.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/{matchId}/{page}")
    public ResponseEntity<?> getMatchReview(@PathVariable String matchId, @PathVariable int page){
        List<ReviewDto> matchReviews = reviewService.getReviews(matchId, page);
        return ResponseEntity.ok(matchReviews);
    }
}
