package com.project.cooperation.controller;

import com.project.cooperation.dto.SessionDTO;
import com.project.cooperation.service.MemberService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
@Slf4j
public class UserController {

    MemberService memberService;
    HttpSession session;

    //닉네임 수정
    @PutMapping("/{idx}")
    public ResponseEntity<SessionDTO> nicknameModify(
            @PathVariable Long idx,
            @RequestBody String nickname){
        log.info("start");
        return ResponseEntity.status(HttpStatus.OK).body(memberService.updateMemberInfo(idx, nickname));
    }

    //회원정보 조회
    //
    @GetMapping("/{idx}")
    public ResponseEntity<SessionDTO> selectMemberByIdx(
            @PathVariable Long idx){
        return ResponseEntity.status(HttpStatus.OK).body(memberService.selectMemberById(idx));
    }
}
