package com.project.cooperation.security.handler;

import com.google.gson.Gson;
import com.project.cooperation.dto.MemberDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;
import java.util.Objects;

//로그인(인증에) 성공했으면 무슨 작업을 해야할지? 인터페이스 구현하는 handler
@Log4j2
public class APILoginSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("--------동작 테스트-----------");
        log.info(authentication);
        log.info("--------동작 테스트-----------");

        //인증한 내용 가져오기
        MemberDTO memberDTO = (MemberDTO) authentication.getPrincipal();

        //로그인 처리 반환을 어떻게 할 것인지를 처리해보기



//        Map<String, Object> claims = memberDTO.getClaims(); //추가적인 정보를 넣기 위한 처리
//        claims.put("accessToken",""); //추가적인 정보1 = accessToken
//        claims.put("refreshToken",""); //추가적인 정보2 = refreshToken
//
//        //claims를 json으로 바꾸기 위한 처리
//        Gson gson = new Gson();
//
//        String jsonStr = gson.toJson(claims);
//
//        response.setContentType("application/json; charset=UTF-8"); //추후 한글 처리를 위해 utf-8
//
//        //화면에 출력
//        PrintWriter printWriter = response.getWriter();
//        printWriter.println(jsonStr);
//        printWriter.close();

    }
}
