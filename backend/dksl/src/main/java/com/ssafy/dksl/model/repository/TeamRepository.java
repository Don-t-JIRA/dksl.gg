package com.ssafy.dksl.model.repository;

import com.ssafy.dksl.model.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findAllByNameContainingOrDescriptionContaining(String searchName, String searchDescription);
    /*@Query(value = "SELECT ROW_NUMBER(), AVGT.TierTeam, AVGT.avgTier" + "\n" +
            "FROM (" +  // 티어 평균 매기기
                "SELECT TE AS TierTeam, ROUND(AVG(TI.orderNum), 0) AS avgTier FROM Team AS TE" + "\n" +
                "JOIN MemberTeam AS MT ON MT.team.id = TE.id" + "\n" +
                "JOIN Member AS ME ON MT.member.id = ME.id" + "\n" +
                "JOIN Tier AS TI ON ME.tier.id = TI.id" + "\n" +
                "GROUP BY TE" + "\n" +
                "ORDER BY AVG(TI.orderNum) ASC" + "\n" +
            ") AVGT JOIN Tier T ON T.id = AVGT.avgTier"
    )*/
    @Query(value = "SELECT ME.teams, ROUND(AVG(TI.orderNum), 0) AS avgTier" + "\n" +
            "FROM Member AS ME" + "\n" +
            "JOIN Tier TI ON ME.tier.id = TI.id" + "\n" +
            "GROUP BY ME.teams")
    Map<String, Object> findAllOrderByOrderNum();


}
