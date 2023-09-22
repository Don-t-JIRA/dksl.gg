package com.ssafy.dksl.model.entity;

import com.ssafy.dksl.model.dto.response.TierResponse;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import org.hibernate.annotations.Comment;

import java.net.URL;

@Entity
@Getter
public class Tier {
    @Id
    @Column(name = "id", columnDefinition = "VARCHAR(12) CHARACTER SET UTF8")
    @Comment("짧은 구분자")
    private String id;

    private int num;

    @Column(name = "name", nullable = false, unique = true, columnDefinition = "VARCHAR(20) CHARACTER SET UTF8")
    @Comment("이름")
    private String name;

    @Comment("이미지")
    private URL image;

    public TierResponse toTierResponse() {
        return TierResponse.builder()
                .name(this.getName())
                .num(this.getNum())
                .build();
    }
}
