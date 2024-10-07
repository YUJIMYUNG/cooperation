package com.project.cooperation.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProjectDTO {
    
    private Long idx;

    @NotEmpty(message = "제목을 입력해주세요.")
    @Size(max = 100, message = "제목은 100자까지만 가능합니다.")
    private String title;

    @NotEmpty(message = "설명을 입력해주세요")
    @Size(max = 100, message = "설명은 100자까지만 가능합니다.")
    private String description;

    @NotNull(message = "생성자는 필수입니다.")
    private Long author;

    @NotNull(message = "시작일은 필수입니다.")
    private LocalDate startDate;

    @NotNull(message = "마감일은 필수입니다.")
    private LocalDate endDate;
}
