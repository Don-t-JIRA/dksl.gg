package com.ssafy.dksl.model.dto.request;

import com.ssafy.dksl.model.dto.command.TeamCommand;
import com.ssafy.dksl.util.exception.CreateDataException;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class TeamRequest {
    @NotNull
    private String name;
    private String description;
    private MultipartFile img;

    public TeamCommand toTeamCommand(String token) throws CreateDataException {
        if (this.img == null) {
            throw new CreateDataException("이미지 파일 업로드에 실패 했습니다.");
        }
        String contentType = this.img.getContentType();  // 확장자 타입
        if (contentType == null || contentType.trim().equals("")) {  // 확장자 타입이 없을 경우
            throw new CreateDataException("이미지 파일 업로드에 실패 했습니다.");
        } else if (!contentType.contains("image/jpeg") || contentType.contains("image/png")) {  // 확장자 타입이 jpg나 png가 아닐 경우
            throw new CreateDataException("이미지 파일 업로드에 실패 했습니다.");
        }

        return TeamCommand.builder()
                .name(this.getName())
                .description(this.getDescription())
                .accessToken(token)
                .img(this.getImg())
                .build();
    }
}
