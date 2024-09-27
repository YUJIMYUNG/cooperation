package com.project.cooperation.dto;

import com.project.cooperation.common.Role;
import com.project.cooperation.model.Member;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JoinRequest {

    @NotBlank(message = "ID를 입력하세요")
    private String id;

    @NotBlank(message = "비밀번호를 입력하세요.")
    private String password;
    private String passwordConfirm;

    @NotBlank(message = "닉네임을 입력하세요.")
    @Size(min = 0, max = 10, message = "0~10자로 입력하세요.")
    private String nickname;

    @NotBlank(message = "이메일을 입력하세요")
    private String email;

    public Member toEntity(){
        return Member.builder()
                .id(this.id)
                .password(this.password)
                .nickname(this.nickname)
                .role(Role.USER)
                .build();
    }

}
