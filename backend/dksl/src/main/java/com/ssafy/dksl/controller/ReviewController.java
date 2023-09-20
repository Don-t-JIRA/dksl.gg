package com.ssafy.dksl.controller;

import com.ssafy.dksl.exception.NonExistReviewException;
import com.ssafy.dksl.exception.UserNotExistException;
import com.ssafy.dksl.model.dto.request.ReviewSaveRequestDto;
import com.ssafy.dksl.model.dto.ReviewSearchDto;
import com.ssafy.dksl.model.dto.request.ReviewUpdateRequestDto;
import com.ssafy.dksl.model.dto.response.ReviewUpdateResponseDto;
import com.ssafy.dksl.model.entity.Review;
import com.ssafy.dksl.model.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/{matchId}/{page}")
    public ResponseEntity<?> getMatchReview(@PathVariable String matchId, @PathVariable int page){
        List<ReviewSearchDto> matchReviews = reviewService.getReviews(matchId, page);
        return ResponseEntity.ok(matchReviews);
    }

    @PostMapping("/register")
    public ResponseEntity<?> saveMatchReview(@RequestBody @Valid ReviewSaveRequestDto reviewSaveRequestDto) {
        try {
            Review savedReview = reviewService.saveReview(reviewSaveRequestDto);

            if(savedReview==null){
                return new ResponseEntity<>("리뷰 저장이 정상적으로 이루어지지 않았습니다.", HttpStatus.BAD_REQUEST);
            }

            return ResponseEntity.ok("리뷰가 정상적으로 등록되었습니다.");
        } catch (UserNotExistException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/update/")
    public ResponseEntity<?> updateMatchReview(@RequestBody @Valid ReviewUpdateRequestDto reviewUpdateRequestDto){
        try {
            ReviewUpdateResponseDto reviewUpdateResponseDto = reviewService.updateReview(reviewUpdateRequestDto);

            return ResponseEntity.ok(reviewUpdateResponseDto);
        } catch (NonExistReviewException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
