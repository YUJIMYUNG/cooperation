package com.project.cooperation.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;


@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectMemberId implements Serializable {
    @Column(name = "member_idx")
    private Long memberIdx;

    @Column(name = "project_idx")
    private Long projectIdx;
}
