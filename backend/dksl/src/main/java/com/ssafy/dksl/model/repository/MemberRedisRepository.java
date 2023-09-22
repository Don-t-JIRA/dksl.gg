package com.ssafy.dksl.model.repository;

import com.ssafy.dksl.model.entity.MemberRedis;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRedisRepository extends CrudRepository<MemberRedis, String> {
    MemberRedis findByPuuid(String puuid);
}
