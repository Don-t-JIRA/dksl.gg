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
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("고유번호")
    private long id;

    @Column(name = "client_id", columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    @Comment("클라이언트 ID")
    private String clientId;

    @Column(name = "password", nullable = false, columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    @Comment("비밀번호")
    private String password;

    @Column(name = "name", nullable = false, unique = true, columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    @Comment("계정 닉네임")
    private String name;

    @Column(name = "email", nullable = false, columnDefinition = "VARCHAR(100) CHARACTER SET UTF8")
    @Comment("이메일")
    private String email;

    @Column(name = "puuid", nullable = false, unique = true, columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    @Comment("PUUID")
    private String puuid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tier_id", nullable = false)
    @Comment("티어")
    private Tier tier;

    @Column(name = "rank", nullable = false)
    @Comment("랭크")
    private int rank;

    @OneToMany(mappedBy = "member")
    private List<MemberTeam> teams = new ArrayList<>();

    @Column(name = "deleted_at")
    @Comment("삭제일")
    private LocalDateTime deletedAt;
}
