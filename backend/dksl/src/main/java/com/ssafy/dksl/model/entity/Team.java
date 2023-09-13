package com.ssafy.dksl.model.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.Comment;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true, columnDefinition = "VARCHAR(20) CHARACTER SET UTF8")
    @Comment("이름")
    private String name;


    @OneToMany(mappedBy = "team")
    private List<UserTeam> users = new ArrayList<>();
}
