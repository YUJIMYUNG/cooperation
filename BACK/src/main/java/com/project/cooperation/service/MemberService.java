package com.project.cooperation.service;

import com.project.cooperation.dto.JoinRequest;
import com.project.cooperation.dto.LoginRequest;
import com.project.cooperation.dto.SessionDTO;
import com.project.cooperation.model.Member;
import com.project.cooperation.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

//로그인을 제외한 member 관련 service
@Service
@Transactional
@RequiredArgsConstructor
public class MemberService{
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final HttpSession session;

    //로그인 ID 중복검사 메서드
    public boolean checkLoginIdDuplicate(String id){
        return memberRepository.existsById(id);
    }

    //회원가입 메서드
//    public void join(JoinRequest joinRequest){
//        memberRepository.save(joinRequest.toEntity());
//    }

    //BCryptPasswordEncoder를 통해서 암호화 작업을 추가한 회원가입 메서드
    public void securityJoin(JoinRequest joinRequest){
        if(memberRepository.existsById(joinRequest.getId())){
            return;
        }

        joinRequest.setPassword(bCryptPasswordEncoder.encode(joinRequest.getPassword()));

        memberRepository.save(joinRequest.toEntity());
    }

    //로그인 메서드
    public Member login(LoginRequest loginRequest) {
        Member findMember = memberRepository.findById(loginRequest.getId());

        if(findMember == null) {
            return null;
        }

        if(!findMember.getPassword().equals(loginRequest.getPassword())) {
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

    //회원정보 변경
    public SessionDTO updateMemberInfo(Long idx, String nickname){

        return null;
    }

    //회원정보 조회
    public SessionDTO selectMemberById(Long idx){
        Member member = memberRepository.findById(idx)
                .orElseThrow(() -> new EntityNotFoundException("Member not found witd idx" + idx));
        return convertToDTO(member);
    }
    
    // idx로 멤버 조회
    public Member getMemberByIdx(Long idx){
        return memberRepository.findById(idx)
                .orElseThrow(() -> new EntityNotFoundException("Member not found witd idx" + idx));
    }



    //member 엔티티를 DTO로 변환해주는 함수
    private SessionDTO convertToDTO(Member member){
        return SessionDTO.builder()
                .nickname(member.getNickname())
                .email(member.getEmail())
                .userIdx(member.getIdx())
                .color(member.getColor())
                .id(member.getId())
                .build();
    }

}
