package com.project.cooperation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SessionDTO {
    private String nickname;
    private String email;
    private Long userIdx;
}
