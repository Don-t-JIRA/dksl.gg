package com.ssafy.dksl.model.repository;

import com.ssafy.dksl.model.dto.command.OrderTeamCommand;
import com.ssafy.dksl.model.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findAllByNameContainingOrDescriptionContaining(String searchName, String searchDescription);


}
