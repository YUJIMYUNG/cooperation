package com.project.cooperation.controller;

import com.project.cooperation.dto.SessionDTO;
import com.project.cooperation.service.MemberService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
@Slf4j
public class UserController {

    private final MemberService memberService;
    private final HttpSession session;

    //회원정보 수정
    @PutMapping("/{idx}")
    public ResponseEntity<SessionDTO> userInfoModify(
            @PathVariable Long idx,
            @RequestBody Map<String, String> updateInfo){
        String nickname = updateInfo.get("nickname");
        String color = updateInfo.get("color");

        log.info("Updating member info : idx={}, nickname{}, color={}", idx, nickname, color);

        try {
            SessionDTO updateMember = memberService.updateMemberInfo(idx, nickname, color);
            return ResponseEntity.ok(updateMember);
        } catch (EntityNotFoundException e){
            log.error("Member not found : {}", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e){
            log.error("Error updating member info : {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    //회원정보 조회
    //
    @GetMapping("/{idx}")
    public ResponseEntity<SessionDTO> selectMemberByIdx(
            @PathVariable Long idx){
        return ResponseEntity.status(HttpStatus.OK).body(memberService.selectMemberById(idx));
    }
}
