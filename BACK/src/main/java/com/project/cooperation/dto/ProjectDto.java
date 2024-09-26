package com.project.cooperation.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProjectDto {
    private String title, description;
    private Long author, idx;
    private LocalDate startDate, endDate;
}
