package com.ssafy.dksl.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "member", timeToLive = 600L)
@Builder
@Getter
public class MemberRedis {

    @Id
    private String clientId;

    private String refreshToken;
}
