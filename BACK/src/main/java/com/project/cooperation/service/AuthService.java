package com.project.cooperation.service;

import com.project.cooperation.dto.SessionDTO;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    public SessionDTO validate(HttpSession session){
        //1. 컨트롤러랑 연결(idx)


        return (SessionDTO) session.getAttribute("user");
    }

}
