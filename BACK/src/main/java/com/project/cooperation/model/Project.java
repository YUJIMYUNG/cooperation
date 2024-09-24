package com.project.cooperation.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "project")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_idx", nullable = false)
    private Long idx;

    @Column(name = "project_name", nullable = false, length = 100)
    private String title;

    @ManyToOne
    @JoinColumn(name = "member_idx", nullable = false)
    private Member author;

    @Column(name = "project_description", nullable = false, length = 100)
    private String description;

    @Column(name = "project_start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "project_end_date", nullable = false)
    private LocalDate endDate;

    public void updateProject(String title, String description, LocalDate startDate, LocalDate endDate){
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
