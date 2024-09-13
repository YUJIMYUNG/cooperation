package com.proejct.cooperation.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "project")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private int projectId;

    @Column(name = "project_id", nullable = false, length = 100)
    private String projectName;

    @Column(name = "project_description", nullable = false)
    private String projectDescription;

    @Column(name = "project_start_date", nullable = false)
    private LocalDate projectStartDate;

    @Column(name = "project_end_date", nullable = false)
    private LocalDate projectEndDate;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private int creator;


    /* project_id BIGINT NOT NULL AUTO_INCREMENT COMMENT '프로젝트 ID',
    project_name VARCHAR(100) NOT NULL COMMENT '제목',
    member_idx BIGINT NOT NULL COMMENT '만든이',
    project_description VARCHAR(100) NOT NULL COMMENT '설명, 내용',
    project_start_date DATE NOT NULL COMMENT '시작날',
    project_end_date DATE NOT NULL COMMENT '끝나는날',*/

}
