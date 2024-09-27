package com.project.cooperation.service;

import com.project.cooperation.dto.JoinRequest;
import com.project.cooperation.model.Member;
import com.project.cooperation.model.Project;
import com.project.cooperation.repository.MemberRepository;
import com.project.cooperation.security.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService implements  UserDetailsService{
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> {
                    return new UsernameNotFoundException("해당 유저를 찾을 수 없습니다.");
                });
        //수정해야함
        return null;
    }

    // BCryptPasswordEncoder를 통해 비밀번호 암호와 작업에 추가한 회원가입 로직
    //public void securityJoin(JoinRequest)


}
