package com.project.cooperation.service;

import com.project.cooperation.dto.TaskDTO;
import com.project.cooperation.model.Member;
import com.project.cooperation.model.Task;
import com.project.cooperation.repository.MemberRepository;
import com.project.cooperation.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final MemberRepository memberRepository;

    // 해당 프로젝트의 모든 작업 찾기
    public List<TaskDTO> getAllTasks(Long projectIdx){
        List<Task> taskList = taskRepository.findAllByProjectIdx(projectIdx);
        return taskList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private TaskDTO convertToDTO(Task task) {
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
                .projectName(task.getProject().getTitle())
                .assignedToName(getAssignedMemberName(task.getAssignedToIdx()))
                .build();
    }

    /**
     * 해당 작업의 작업자 닉네임 찾기
     * @param memberIdx
     * @return
     */
    private String getAssignedMemberName(Long memberIdx) {
        Member member = memberRepository.findByIdx(memberIdx)
                .orElseThrow(()->new UsernameNotFoundException("Not Found"));
        return member.getNickname();
    }
}


