package com.ssafy.dksl.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "refresh_token", timeToLive = 14 * 24 * 60 * 60 * 1000)
@Builder
@Getter
public class RefreshToken {

    @Id
    private String clientId;

    private String refreshToken;
}
