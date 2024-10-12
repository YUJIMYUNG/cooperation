package com.project.cooperation.service;

import com.project.cooperation.dto.SessionDTO;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {
    private final HttpSession session;

    public SessionDTO validate(Long idx){
        //1. 컨트롤러랑 연결(idx)
        SessionDTO getSessionMemberInfo = (SessionDTO) session.getAttribute("user");
        log.info("{}",session.getAttribute("user"));
        //2.
        if(!getSessionMemberInfo.getUserIdx().equals(idx)){
            session.removeAttribute("user");
        }
        return getSessionMemberInfo;
    }

}
