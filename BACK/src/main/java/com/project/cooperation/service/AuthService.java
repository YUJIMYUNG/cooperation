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
    private final HttpSession session;

    public SessionDTO validate(Long idx){
        //1. 컨트롤러랑 연결(idx)

        log.info("Received idx: {}", idx);
        log.info("Current session: {}", session.getId());
        log.info("Session attributes: {}", session.getAttributeNames());
        log.info("All session attributes: {}", Collections.list(session.getAttributeNames()));

        SessionDTO getSessionMemberInfo = (SessionDTO) session.getAttribute("user");
        log.info("{}",session.getAttribute("user"));
        //2.
        if(!getSessionMemberInfo.getUserIdx().equals(idx)){
            session.removeAttribute("user");
        }
        return getSessionMemberInfo;
    }

}
