package com.project.cooperation.service;

import com.project.cooperation.model.Member;
import com.project.cooperation.model.Project;
import com.project.cooperation.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService{
    private final MemberRepository memberRepository;

}
