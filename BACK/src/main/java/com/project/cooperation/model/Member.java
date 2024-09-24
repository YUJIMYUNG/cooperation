package com.project.cooperation.model;

import com.project.cooperation.common.Role;
import jakarta.persistence.*;
import lombok.*;
<<<<<<< HEAD

import java.util.ArrayList;
import java.util.List;
=======
import org.hibernate.annotations.IdGeneratorType;
import org.hibernate.annotations.Type;
>>>>>>> d60c0ed6a48a5691b1606b8d6ee5167431e0df80

@Entity
@Table(name = "member")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@ToString(exclude = "memberRoleList")
public class Member {

    @Id
    @Column(name = "member_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(name = "member_id")
    private String id;

    @Column(name = "member_nickname")
    private String nickname;

    @Column(name = "member_email")
    private String email;

    @Column(name = "member_password")
    private String password;

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<Role> memberRoleList = new ArrayList<>();

    public void addRole(Role role){
        memberRoleList.add(role);
    }

    public void clearRole(){
        memberRoleList.clear();
    }

}
