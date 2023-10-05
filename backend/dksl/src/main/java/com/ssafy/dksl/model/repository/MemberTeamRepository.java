package com.ssafy.dksl.model.repository;

import com.ssafy.dksl.model.entity.MemberTeam;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberTeamRepository extends JpaRepository<MemberTeam, Long> {
    List<MemberTeam> findAllByOrderByUpdatedAtDesc() throws DataAccessException;
}
