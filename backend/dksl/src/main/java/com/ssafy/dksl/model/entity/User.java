package com.ssafy.dksl.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.hibernate.annotations.Comment;

import java.net.URL;
import java.time.LocalDateTime;

@Entity
public class User {
    @Id
    @Column(name = "id", columnDefinition = "VARCHAR(20) CHARACTER SET UTF8")
    @Comment("클라이언트 ID")
    private String id;

    @Column(name = "name", nullable = false, unique = true, columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    @Comment("계정 닉네임")
    private String name;

    @Column(name = "puuid", nullable = false, unique = true, columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    @Comment("PUUID")
    private String puuid;

    @Comment("삭제일")
    private LocalDateTime deleted_at;
}
