package com.ssafy.dksl.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
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
//    @JoinTable(name = "user_team", joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")}, inverseJoinColumns = {@JoinColumn(name = "team_id", referencedColumnName = "id")})
//    private Set<Team> teams;

    @OneToMany(mappedBy = "user")
    private List<UserTeam> teams = new ArrayList<>();

    @JsonIgnore
    @Comment("삭제일")
    private LocalDateTime deleted_at;
}
