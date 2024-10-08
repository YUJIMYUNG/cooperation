package com.project.cooperation.common;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;


@Data
@AllArgsConstructor
public class ErrorResponse {
    private String error;
    private String message;
}
