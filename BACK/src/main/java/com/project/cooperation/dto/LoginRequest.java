package com.project.cooperation.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

//로그인시 데이터 받는 폼
@Data
@NoArgsConstructor
public class LoginRequest {

    private String id;
    private String password;
}
