package com.project.cooperation.dto;

import com.project.cooperation.common.Priority;
import com.project.cooperation.common.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskDTO {

    private Long idx;
    private String name;
    private String description;
    private Long projectIdx;
    private Priority priority;
    private Status status;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long assignedToIdx;

    // 추가 필드: 클라이언트에게 유용할 수 있는 정보
    private String assignedToName;
}