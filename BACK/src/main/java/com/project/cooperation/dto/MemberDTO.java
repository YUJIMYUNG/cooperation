package com.project.cooperation.dto;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class MemberDTO {

    private Long idx;

    private String id;

    private String email;

    private String nickname;

    private String password;

    private List<Long> roleNames = new ArrayList<>();

//    public MemberDTO(Long idx, String id, String email, String nickname, String password, List<Long> roleNames){
//        super(
//                id,
//                email,
//                password,
//                roleNames.stream().map(str -> new SimpleGrantedAuthority("Role_"+str)).collect(Collectors.toList()));
//        this.idx = idx;
//        this.id = id;
//        this.email = email;
//        this.nickname = nickname;
//        this.password = password;
//        this.roleNames = roleNames;
//    }


























}
