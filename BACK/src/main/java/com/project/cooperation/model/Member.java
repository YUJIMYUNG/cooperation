package com.project.cooperation.model;

import com.project.cooperation.common.Role;
import jakarta.persistence.*;
import lombok.*;


import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "member")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@ToString
public class Member {

    @Id
    @Column(name = "member_idx", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(name = "member_id", nullable = false)
    private String id;

    @Column(name = "member_nickname", nullable = false)
    private String nickname;

    @Column(name = "member_email", nullable = false)
    private String email;

    @Column(name = "member_password", nullable = false)
    private String password;

    @Column(name = "member_color", nullable = false)
    private String color;

    @Enumerated(EnumType.STRING)
    private Role role;

    //회원정보 업데이트 메서드
    public void updateInfo(String nickname, String color){
        this.nickname = nickname;
        this.color = color;
    }
}
