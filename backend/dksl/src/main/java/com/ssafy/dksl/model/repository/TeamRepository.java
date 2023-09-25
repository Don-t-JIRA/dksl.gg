package com.ssafy.dksl.model.repository;

import com.ssafy.dksl.model.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findAllByNameContainingOrDescriptionContainingAndSubmitAtIsNotNull(String searchName, String searchDescription);
    List<Team> findAllBySubmitAtIsNotNullOrderByNameAsc();


}
