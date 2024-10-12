package com.project.cooperation.controller;

import com.project.cooperation.dto.SessionDTO;
import com.project.cooperation.service.AuthService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final BCryptPasswordEncoder passwordEncoder;

    //프론트에서 받아온 로그인 정보를 Session과 비교하는 작업
    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestBody Long idx){
        log.info("idx : {}",idx);
        return ResponseEntity.status(HttpStatus.OK).body(authService.validate(idx));
    }





}
