package com.ssafy.dksl.model.repository;

import com.ssafy.dksl.model.entity.MemberRedis;
import com.ssafy.dksl.model.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
}
