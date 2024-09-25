package com.project.cooperation.security;

import com.project.cooperation.model.Member;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public class UserDetails implements org.springframework.security.core.userdetails.UserDetails {
    Member member;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {


        return List.of();
    }

    @Override
    public String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return member.getId();
    }

}
