package com.project.cooperation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {
    private String title, description;
    private int author;
    private LocalDate startDate, endDate;
}
