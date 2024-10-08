package com.project.cooperation.service;

import com.project.cooperation.dto.TaskDTO;
import com.project.cooperation.model.Member;
import com.project.cooperation.model.Task;
import com.project.cooperation.repository.MemberRepository;
import com.project.cooperation.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;


@Service
@Slf4j
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public List<TaskDTO> getAllTasks(Long projectIdx) {
        List<Task> tasks = taskRepository.findAllByProjectIdxWithProject(projectIdx);

        // 고유한 assignedToIdx 값들을 수집
        Set<Long> memberIds = tasks.stream()
                .map(Task::getAssignedToIdx)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        // 멤버 정보를 한 번에 조회
        Map<Long, String> memberNicknames = memberRepository.findNicknamesById(memberIds)
                .stream()
                .collect(Collectors.toMap(
                        m -> ((Number) m.get("id")).longValue(),
                        m -> (String) m.get("nickname")
                ));

        // TaskDTO로 변환
        return tasks.stream()
                .map(task -> convertToDTO(task, memberNicknames))
                .collect(Collectors.toList());
    }

    private TaskDTO convertToDTO(Task task, Map<Long, String> memberNicknames) {
        return TaskDTO.builder()
                .idx(task.getIdx())
                .name(task.getName())
                .description(task.getDescription())
                .projectIdx(task.getProject().getIdx())
                .priority(task.getPriority())
                .status(task.getStatus())
                .startDate(task.getStartDate())
                .endDate(task.getEndDate())
                .assignedToIdx(task.getAssignedToIdx())
                .assignedToName(memberNicknames.get(task.getAssignedToIdx()))
                .build();
    }
}


