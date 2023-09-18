package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.ReviewDto;
import com.ssafy.dksl.model.entity.Review;
import com.ssafy.dksl.model.entity.User;
import com.ssafy.dksl.model.repository.ReviewRepository;
import com.ssafy.dksl.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.groups.Tuple.tuple;

@Transactional
//@Rollback(value = false)
@SpringBootTest
@ActiveProfiles("test")
class ReviewServiceTest {
    @Autowired
    ReviewService reviewService;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    UserRepository userRepository;

    @BeforeEach()
    public void saveReviews(){
        String matchId = "KR_66990325";
    }

    @DisplayName("특정 matchId에 해당하는 ")
    @Test
    void getReviews() throws InterruptedException {
        // given
        String matchId = "KR_66990325";

        User user = createUser("testClientId", "testPassword", "testName", "testPUUID");

        User savedUser = userRepository.save(user);

        for(int i = 0; i< 40; i++) {
            reviewRepository.save(createReview("testContent" + i, matchId, savedUser));
            Thread.sleep(1);
        }

        // when
        List<ReviewDto> reviews = reviewService.getReviews(matchId, 2);

        // then
        Assertions.assertThat(reviews).hasSize(10)
                .extracting("matchId", "content")
                .containsExactly(
                        tuple(matchId, "testContent19"), tuple(matchId, "testContent18"),
                        tuple(matchId, "testContent17"), tuple(matchId, "testContent16"),
                        tuple(matchId, "testContent15"), tuple(matchId, "testContent14"), tuple(matchId, "testContent13"),
                        tuple(matchId, "testContent12"), tuple(matchId, "testContent11"), tuple(matchId, "testContent10")
                );;
    }

    private User createUser(String clientId, String password, String name, String puuid) {
        return User.builder()
                .clientId(clientId)
                .password(password)
                .name(name)
                .puuid(puuid)
                .build();
    }

    private Review createReview(String testContent, String matchId, User savedUser) {
        return Review.builder()
                .user(savedUser)
                .matchId(matchId)
                .content(testContent)
                .deletedAt(null)
                .build();
    }
}