package com.ssafy.dksl.model.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.Comment;

import java.util.Set;

@Entity
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true, columnDefinition = "VARCHAR(20) CHARACTER SET UTF8")
    @Comment("이름")
    private String name;

    @ManyToMany
    @JoinTable(name = "user_team", joinColumns = {@JoinColumn(name = "team_id", referencedColumnName = "id")}, inverseJoinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")})
    private Set<User> users;
}
