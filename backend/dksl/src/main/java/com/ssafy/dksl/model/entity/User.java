package com.ssafy.dksl.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Null;
import org.hibernate.annotations.Comment;

import java.net.URL;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
public class User {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("uid")
    private long id;

    @Column(name = "client_id", columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    @Comment("클라이언트 ID")
    private String clientId;

    @JsonIgnore
    @Column(name = "password", nullable = false, columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    @Comment("비밀번호")
    private String password;

    @Column(name = "name", nullable = false, unique = true, columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    @Comment("계정 닉네임")
    private String name;

    @Column(name = "puuid", nullable = false, unique = true, columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    @Comment("PUUID")
    private String puuid;

//    @ManyToMany
//    @JoinTable(
//            name = "user_authority",
//            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
//            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
//    private Set<Authority> authorities;

    @ManyToMany
    @JoinTable(name = "user_team", joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")}, inverseJoinColumns = {@JoinColumn(name = "team_id", referencedColumnName = "id")})
    private Set<Team> teams;

    @JsonIgnore
    @Comment("삭제일")
    private LocalDateTime deleted_at;
}
