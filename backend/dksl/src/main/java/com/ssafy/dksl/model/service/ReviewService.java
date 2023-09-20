package com.ssafy.dksl.model.service;

import com.ssafy.dksl.exception.NonExistReviewException;
import com.ssafy.dksl.exception.UserNotExistException;
import com.ssafy.dksl.model.dto.request.ReviewDeleteRequestDto;
import com.ssafy.dksl.model.dto.request.ReviewSaveRequestDto;
import com.ssafy.dksl.model.dto.ReviewSearchDto;
import com.ssafy.dksl.model.dto.request.ReviewUpdateRequestDto;
import com.ssafy.dksl.model.dto.response.ReviewDeleteResponseDto;
import com.ssafy.dksl.model.dto.response.ReviewUpdateResponseDto;
import com.ssafy.dksl.model.entity.Review;
import com.ssafy.dksl.model.entity.User;
import com.ssafy.dksl.model.repository.ReviewRepository;
import com.ssafy.dksl.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    private final int PAGESIZE = 10;

    public List<ReviewSearchDto> getReviews(String matchId, int page){
        List<Review> reviews = reviewRepository.findByMatchIdAndDeletedAtIsNullOrderByCreatedAtDesc(matchId, PageRequest.of(page, PAGESIZE));

        return reviews.stream().map(Review::to).collect(Collectors.toList());
    }

    public Review saveReview(ReviewSaveRequestDto reviewSaveRequestDto) throws UserNotExistException{
        String clientId = reviewSaveRequestDto.getClientId();
        User findUser = userRepository.findByClientId(clientId).orElseThrow(() -> new UserNotExistException("롤 계정이 존재하지 않는 유저입니다."));

        Review savedReview = Review.builder()
                .user(findUser)
                .matchId(reviewSaveRequestDto.getMatchId())
                .content(reviewSaveRequestDto.getContent())
                .build();

        return reviewRepository.save(savedReview);
    }

    @Transactional
    public ReviewUpdateResponseDto updateReview(ReviewUpdateRequestDto reviewUpdateRequestDto) throws NonExistReviewException {
        Review findReview = reviewRepository.findById(reviewUpdateRequestDto.getId()).orElseThrow(() -> new NonExistReviewException("존재하지 않는 댓글입니다."));

        findReview.updateReview(reviewUpdateRequestDto.getContent());

        return ReviewUpdateResponseDto.builder()
                .id(findReview.getId())
                .content(findReview.getContent())
                .matchId(findReview.getMatchId())
                .build();
    }

    /*
     * DB 상에서 삭제하는 것이 아닌 deletedAt 필드에 삭제 시간만을 업데이트하는 것이다.
     */
    @Transactional
    public ReviewDeleteResponseDto deleteReview(ReviewDeleteRequestDto reviewDeleteRequestDto) throws NonExistReviewException {
        Review findReview = reviewRepository.findById(reviewDeleteRequestDto.getId()).orElseThrow(() -> new NonExistReviewException("존재하지 않는 댓글입니다."));

        findReview.deleteReview();

        return ReviewDeleteResponseDto.builder()
                .id(findReview.getId())
                .build();
    }
}
