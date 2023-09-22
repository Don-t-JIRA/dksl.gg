package com.ssafy.dksl.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.Comment;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Team extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true, columnDefinition = "VARCHAR(20) CHARACTER SET UTF8")
    @Comment("이름")
    private String name;

    @Column(name = "description", columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    @Comment("소개")
    private String description;

    @Column(name = "img", columnDefinition = "VARCHAR(255) CHARACTER SET UTF8")
    @Comment("이미지")
    private String img;

    @OneToMany(mappedBy = "team")
    private List<MemberTeam> members = new ArrayList<>();
}
