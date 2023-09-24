package com.ssafy.dksl.model.repository;

import com.ssafy.dksl.model.dto.command.OrderTeamCommand;
import com.ssafy.dksl.model.entity.MemberTeam;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberTeamRepository extends JpaRepository<MemberTeam, Long> {
    List<MemberTeam> findTop3ByOrderByUpdatedAtDesc() throws DataAccessException;
    @Query(value = "SELECT MT.team AS team, ROUND(AVG(TI.orderNum), 0) AS avgTier" + "\n" +
            "FROM MemberTeam AS MT" + "\n" +
            "JOIN Tier AS TI ON MT.member.tier = TI" + "\n" +
            "WHERE TI.orderNum != 99" + "\n" +
            "GROUP BY MT.team" + "\n" +
            "ORDER BY ROUND(AVG(TI.orderNum), 0)")
    List<OrderTeamCommand> findAllOrderByOrderNum();
}
