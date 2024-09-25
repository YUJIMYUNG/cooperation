package com.project.cooperation.dto;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class MemberDTO extends User {

    private Long idx;

    private String id;

    private String email;

    private String nickname;

    private String password;

    //member role 역할, 화면에서 처리하기 편하게 String 으로 처리
    private List<String> roleNames = new ArrayList<>();

    //  User클래스의 생성자는 username, password, authorities 세가지 매개변수를 받는다.
    public MemberDTO(Long idx,String id, String email, String nickname, String password, List<String> roleNames){
        super(
                id,
                password,
                roleNames.stream().map(str -> new SimpleGrantedAuthority("ROLE_"+str)).collect(Collectors.toList()));
                //SimpleGrantedAuthority :  security가 쓰는 권한. (객체를) 문자열로 권한을 만들어주는 기능
        this.idx = idx;
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.roleNames = roleNames;
    }


    // security로 jwt 문자열을 만들어서 주고받는데, 데이터가 필요하고 그에 대한 처리를 하기 위한 메서드를 만든다.
    public Map<String, Object> getClaims() {

        Map<String, Object> dataMap = new HashMap<>();

        dataMap.put("idx", idx);
        dataMap.put("id", id);
        dataMap.put("email", email);
        dataMap.put("nickname", nickname);
        dataMap.put("password", password);
        dataMap.put("roleNames", roleNames);

        return dataMap;
    }


























}
