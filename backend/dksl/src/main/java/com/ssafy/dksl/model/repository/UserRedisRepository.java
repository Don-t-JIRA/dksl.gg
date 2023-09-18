package com.ssafy.dksl.model.repository;

import com.ssafy.dksl.model.entity.User;
import com.ssafy.dksl.model.entity.UserRedis;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRedisRepository extends CrudRepository<UserRedis, String> {
    UserRedis findByPuuid(String puuid);
}
