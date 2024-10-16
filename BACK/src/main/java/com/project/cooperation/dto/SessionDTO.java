package com.project.cooperation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class SessionDTO {
    private String nickname;
    private String email;
    private Long userIdx;
    private String color;
    private String id;
}
