package com.project.cooperation.service;

import com.project.cooperation.dto.JoinRequest;
import com.project.cooperation.dto.LoginRequest;
import com.project.cooperation.model.Member;
import com.project.cooperation.model.Project;
import com.project.cooperation.repository.MemberRepository;
import com.project.cooperation.security.CustomUserDetailsService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

//로그인을 제외한 member 관련 service
@Service
@Transactional
@RequiredArgsConstructor
public class MemberService{
    private final MemberRepository memberRepository;

    //로그인 ID 중복검사 메서드
    public boolean checkLoginIdDuplicate(String id){
        return memberRepository.existsById(id);
    }

    //회원가입 메서드
    public void join(JoinRequest joinRequest){
        memberRepository.save(joinRequest.toEntity());
    }

    //로그인 메서드

    public Member login(LoginRequest loginRequest) {
        Member findMember = memberRepository.findById(loginRequest.getId());

        if(findMember == null) {
            return null;
        }

        if(findMember.getPassword().equals(loginRequest.getPassword())) {
            return null;
        }

        return findMember;
    }


    //로그인한 Member 반환 메서드
    public Member getLoginMemberById(Long id){
        if(id == null) return null;

        Optional<Member> findMember = memberRepository.findById(id);
        return findMember.orElse(null);
    }

    // BCryptPasswordEncoder를 통해 비밀번호 암호와 작업에 추가한 회원가입 로직
    //public void securityJoin(JoinRequest)


}
