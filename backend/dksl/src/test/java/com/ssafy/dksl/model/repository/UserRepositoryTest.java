package com.ssafy.dksl.model.repository;

import com.ssafy.dksl.model.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles("test")
@Transactional
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @DisplayName("클라이언트 아이디로 유저를 찾는다.")
    @Test
    void findByClientId(){
        // given
        String cliendId = "clientId1";

        User user = User.builder()
                .clientId(cliendId)
                .deleted_at(LocalDateTime.now())
                .name("testUser1")
                .password("clientPassword")
                .puuid("testPUUID")
                .build();

        User savedUser = userRepository.save(user);

        // when
        User findUser = userRepository.findByClientId(cliendId).orElse(null);

        // then
        assertThat(findUser).isNotNull()
                .extracting("clientId", "password", "name", "puuid")
                .contains(savedUser.getClientId(), savedUser.getPassword(), savedUser.getName(), savedUser.getPuuid());
    }

    @DisplayName("소환사명으로 유저를 찾는다.")
    @Test
    void findByName(){
        // given
        String gameName = "testUser1";

        User user = User.builder()
                .clientId("clientId1")
                .deleted_at(LocalDateTime.now())
                .name(gameName)
                .password("clientPassword")
                .puuid("testPUUID")
                .build();

        User savedUser = userRepository.save(user);

        // when
        User findUser = userRepository.findByName(gameName).orElse(null);

        // then
        assertThat(findUser).isNotNull()
                .extracting("clientId", "password", "name", "puuid")
                .contains(savedUser.getClientId(), savedUser.getPassword(), savedUser.getName(), savedUser.getPuuid());

    }
}