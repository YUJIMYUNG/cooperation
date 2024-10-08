package com.project.cooperation.common;

import com.project.cooperation.dto.SessionDTO;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class SessionUtil {

    public static SessionDTO getCurrentUser(){
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession(false);
        if(session != null){
            return (SessionDTO) session.getAttribute("user");
        }
        return null;
    }

    public static Long getUserIdx(){
        SessionDTO user = getCurrentUser();
        return user != null ? user.getUserIdx() : null;
    }

    public static String getUserNickname(){
        SessionDTO user = getCurrentUser();
        return user != null ? user.getNickname() : null;
    }

    public static String getUserEmail(){
        SessionDTO user = getCurrentUser();
        return user != null ? user.getEmail() : null;
    }
}
