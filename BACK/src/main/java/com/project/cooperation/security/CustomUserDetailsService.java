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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Log4j2
public class CustomUserDetailsService implements UserDetailsService {

    //주입받기
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    //username = id에 해당하는 값
    //UserDetails = MemberDTO 역할, 사용자의 정보를 담는 인터페이스
    //로그인을 처리할 때 동작 (security 권한 처리)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info("-----동작 확인 여부-------");
        log.info("username : {}", username);
        Member member = memberRepository.findById(username);
        log.info(" pw : {}", bCryptPasswordEncoder.matches("test123","$2a$10$qmYX0ryFSSpkVdyAwtHJB.XDoPPZOBcNRInVB5yBYWR0UHgaEALsm"));
        String newHahh = bCryptPasswordEncoder.encode("test123");
        log.info("{}",newHahh);
        log.info("{}",bCryptPasswordEncoder.matches("test123","$2a$10$urOlH0gzA4n5F8NcOtpyhu7u0mky17c.XlUyTU9NcXqE2z00uCL4i"));

        log.info(member);
        if(member != null){
            log.info(new com.project.cooperation.security.UserDetails(member));
            return new com.project.cooperation.security.UserDetails(member);
        }


//
//        //있다면 MemberDTO 반환
//        MemberDTO memberDTO = new MemberDTO(
//                member.getIdx(),
//                member.getId(),
//                member.getEmail(),
//                member.getPassword(),
//                member.getNickname(),
//                roleNames.stream().map(role -> role.)); //role을 문자열로 바꾸기
//
//        log.info(memberDTO);

        return null;
    }
}
