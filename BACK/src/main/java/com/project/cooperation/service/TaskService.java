package com.project.cooperation.service;

import com.project.cooperation.common.Priority;
import com.project.cooperation.common.SessionUtil;
import com.project.cooperation.common.Status;
import com.project.cooperation.dto.SessionDTO;
import com.project.cooperation.dto.TaskDTO;
import com.project.cooperation.model.Member;
import com.project.cooperation.model.Project;
import com.project.cooperation.model.Task;
import com.project.cooperation.repository.MemberRepository;
import com.project.cooperation.repository.ProjectRepository;
import com.project.cooperation.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.Value;
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
    private final ProjectRepository projectRepository;
    private final ProjectService projectService;
    private final HttpSession session;

    /**
     * 모든 작업 조회
     * @param projectIdx
     * @return
     */
    @Transactional(readOnly = true)
    public List<TaskDTO> getAllTasks(Long projectIdx) {
        List<Task> tasks = taskRepository.findAllByProjectIdxWithProject(projectIdx);
        return tasks.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * 작업 생성
     * @param projectIdx
     * @param dto
     * @return
     */
    @Transactional
    public TaskDTO createTask(Long projectIdx, TaskDTO dto) {
        Project project = projectService.projectFindById(projectIdx);

        dto.setProjectIdx(projectIdx);

        // assignedToIdx가 null이거나 존재하지 않는 멤버 ID인 경우 예외 처리
        if (dto.getAssignedToIdx() == null) {
            throw new IllegalArgumentException("AssignedToIdx cannot be null");
        }

        // 할당된 멤버가 실제로 존재하는지 확인
        memberRepository.findById(dto.getAssignedToIdx())
                .orElseThrow(() -> new EntityNotFoundException("Member not found with id: " + dto.getAssignedToIdx()));

        Task newTask = convertToEntity(dto);
        project.addTask(newTask);

        Task savedTask = taskRepository.save(newTask);
        return convertToDTO(savedTask);
    }

    @Transactional
    public TaskDTO update(Long projectIdx, Long taskIdx, TaskDTO taskDTO){
/*        if(taskDTO.getIdx() != ((SessionDTO)session.getAttribute("user")).getUserIdx()){
            throw new IllegalArgumentException("로그인 정보가 잘못되었습니다.");
        }*/
        Project project = projectService.projectFindById(projectIdx);

        Task task = taskFindById(taskIdx);

        task.updateTask(
                taskDTO.getName(), taskDTO.getDescription(), Priority.valueOf(taskDTO.getPriority()),
                Status.valueOf(taskDTO.getStatus()), taskDTO.getStartDate(), taskDTO.getEndDate(), taskDTO.getAssignedToIdx()
                );

        return convertToDTO(taskRepository.save(task));

    }
    @Transactional
    public  TaskDTO updateStatus(Long projectIdx, Long taskIdx, String status){
        Project project = projectService.projectFindById(projectIdx);

        Task task = taskFindById(taskIdx);

        String cleanStatus = status.replaceAll("\"", "").trim().toUpperCase();

        task.updateTaskStatus(Status.valueOf(cleanStatus.toUpperCase()));

        return convertToDTO(taskRepository.save(task));
    }

    @Transactional
    public void deleteTask(Long projectIdx, Long taskIdx){
        Project project = projectService.projectFindById(projectIdx);

        Task task = taskFindById(taskIdx);

        taskRepository.delete(task);
    }

    @Transactional
    public void deleteTasks(Long projectIdx, List<Long> taskIdx){
        Project project = projectService.projectFindById(projectIdx);
        List<Task> tasks = taskRepository.findAllById(taskIdx).stream().toList();

        taskRepository.deleteAllById(taskIdx);
    }

    private TaskDTO convertToDTO(Task task) {
        String assignedToName = null;
        if (task.getAssignedToIdx() != null) {
            Member assignedMember = memberRepository.findById(task.getAssignedToIdx())
                    .orElse(null);
            if (assignedMember != null) {
                assignedToName = assignedMember.getNickname();
            }
        }

        return TaskDTO.builder()
                .idx(task.getIdx())
                .name(task.getName())
                .description(task.getDescription())
                .projectIdx(task.getProject().getIdx())
                .priority(task.getPriority().toString())
                .status(task.getStatus().toString())
                .startDate(task.getStartDate())
                .endDate(task.getEndDate())
                .assignedToIdx(task.getAssignedToIdx())
                .assignedToName(assignedToName)
                .build();
    }

    private Task convertToEntity(TaskDTO dto) {
        Project project = projectRepository.findById(dto.getProjectIdx())
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + dto.getProjectIdx()));

        return Task.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .project(project)
                .priority(Priority.valueOf(dto.getPriority()))
                .status(Status.valueOf(dto.getStatus()))
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .assignedToIdx(dto.getAssignedToIdx())
                .build();
    }

    /**
     * idx로 task찾기
     * @param taskIdx
     * @return
     */
    protected Task taskFindById(Long taskIdx){
        return taskRepository.findById(taskIdx)
                .orElseThrow(()->new EntityNotFoundException("Task not found with idx: " + taskIdx));
    }
}


