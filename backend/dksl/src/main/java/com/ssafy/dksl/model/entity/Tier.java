package com.ssafy.dksl.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.dksl.model.dto.response.TierResponse;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Comment;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

@Entity
@Getter
@Slf4j
public class Tier {
    @Id
    @Column(name = "id", columnDefinition = "VARCHAR(12) CHARACTER SET UTF8")
    @Comment("짧은 구분자")
    private String id;

    @Column(name = "order_num", nullable = false, unique = true)
    @Comment("순위")
    private int orderNum;

    @Column(name = "name", nullable = false, unique = true, columnDefinition = "VARCHAR(20) CHARACTER SET UTF8")
    @Comment("이름")
    private String name;

    @Comment("이미지")
    private String img;

    public TierResponse toTierResponse() {
        return TierResponse.builder()
                .id(this.getId())
                .name(this.getName())
                .orderNum(this.getOrderNum())
                .build();
    }
}
