package com.ssafy.dksl.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "user", timeToLive = 600L)
@Builder
@Getter
public class UserRedis {

    @Id
    @JsonIgnore
    private String clientId;
    private String refreshToken;
}
