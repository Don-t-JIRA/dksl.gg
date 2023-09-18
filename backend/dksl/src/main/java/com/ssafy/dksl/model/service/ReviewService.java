package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.ReviewDto;
import com.ssafy.dksl.model.entity.Review;
import com.ssafy.dksl.model.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    private final int PAGESIZE = 10;

    public List<ReviewDto> getReviews(String matchId, int page){
        List<Review> reviews = reviewRepository.findByMatchIdAndDeletedAtIsNullOrderByCreatedAtDesc(matchId, PageRequest.of(page, PAGESIZE));

        return reviews.stream().map(Review::to).collect(Collectors.toList());
    }
}
