package com.ssafy.dksl.model.repository;

import com.ssafy.dksl.model.entity.Tier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TierRepository extends JpaRepository<Tier, String> {
    Tier findByOrderNum(int orderNum);
}
