package com.ssafy.dksl.model.entity;

import jakarta.persistence.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(timeToLive = 1000L)
public class RedisUser {
    @Id
    private String id;

    private int expiresIn;
    private String refreshToken;

}
