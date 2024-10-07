package com.project.cooperation.security;

import com.project.cooperation.model.Member;
import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@ToString
public class UserDetails implements org.springframework.security.core.userdetails.UserDetails {
    Member member;

    public UserDetails(Member member){
        this.member = member;
    }


    //현재 member의 role을 반환
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect = new ArrayList<GrantedAuthority>();
        collect.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return "ROLE_" + member.getRole();
            }
        });
//		System.out.println(collect);
        return collect;
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

    //생성한 userName은 Id에 사용
    @Override
    public String getUsername() {
        return member.getId();
    }

    //계정 만료 되었는지(true : 만료 x)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정이 잠겼는지(true : 잠기지 않음)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 비밀번호가 만료되었는지 (true : 만료되지 않음)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 계정이 활성화(사용가능여부) 되었는지 (true : 활성화)
    @Override
    public boolean isEnabled() {
        return true;
    }
}
