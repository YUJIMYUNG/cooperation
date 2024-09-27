package com.project.cooperation.security;

import com.project.cooperation.dto.MemberDTO;
import com.project.cooperation.model.Member;
import com.project.cooperation.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Log4j2
public class CustomUserDetailsService implements UserDetailsService {

    //주입받기
    private final MemberRepository memberRepository;

    //username = id에 해당하는 값
    //UserDetails = MemberDTO 역할, 사용자의 정보를 담는 인터페이스
    //로그인을 처리할 때 동작 (security 권한 처리)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info("-----동작 확인 여부-------");

        Member member = memberRepository.getWithRoles(username);

        if(member == null){
            throw new UsernameNotFoundException("Not Found");
        }

        //있다면 MemberDTO 반환
        MemberDTO memberDTO = new MemberDTO(
                member.getIdx(),
                member.getId(),
                member.getEmail(),
                member.getPassword(),
                member.getNickname(),
                member.getMemberRoleList()
                        .stream()
                        .map(role -> role.name()).collect(Collectors.toList())); //role을 문자열로 바꾸기

        log.info(memberDTO);

        return memberDTO;
    }
}
