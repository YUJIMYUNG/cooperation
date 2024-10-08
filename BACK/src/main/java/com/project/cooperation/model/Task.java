package com.project.cooperation.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.cooperation.common.Priority;
import com.project.cooperation.common.Status;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.IdGeneratorType;

import javax.naming.Name;
import java.time.LocalDate;

@Entity
@Table(name = "task")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_idx")
    private Long idx;

    @Column(name = "task_name", nullable = false, length = 50)
    private String name;

    @Column(name = "task_description", nullable = false, length = 100)
    private String description;

    // 프로젝트 설정을 위한 메서드
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_idx", nullable = false)
    @JsonIgnore
    private Project project;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false, length = 50)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 11)
    private Status status;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Setter
    @Column(name = "assigned_to", nullable = false)
    private Long assignedToIdx;

    // 기타 필드 업데이트를 위한 메서드
    public void updateTask(String name, String description, Priority priority, Status status, LocalDate startDate, LocalDate endDate, Long assignedToIdx) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.assignedToIdx = assignedToIdx;
    }

}
