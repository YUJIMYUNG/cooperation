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

//    @ElementCollection(fetch = FetchType.LAZY)
//    @Builder.Default
//    @Enumerated(EnumType.STRING)
//    private List<Role> memberRoleList = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Role role;


}
