package com.project.cooperation.controller;

import com.project.cooperation.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
public class UserController {

    MemberService memberService;

//    @PostMapping
//    public ResponseEntity<?> register(
//
//    )
}
