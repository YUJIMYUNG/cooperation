package com.project.cooperation.controller;
import com.project.cooperation.dto.TaskDTO;
import com.project.cooperation.service.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/projects/{projectIdx}/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    /**
     * 프로젝트에 해당하는 모든 작업 조회
     * @param projectIdx
     * @return
     */
    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks(@PathVariable Long projectIdx){
        return ResponseEntity.status(HttpStatus.FOUND).body(taskService.getAllTasks(projectIdx));
    }

    /**
     * 작업 생성
     * @param projectIdx
     * @param task
     * @return
     */
    @PostMapping
    public ResponseEntity<TaskDTO> createTask(
            @PathVariable Long projectIdx,
            @RequestBody TaskDTO task){
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(projectIdx, task));
    }

    /**
     * 작업 수정
     * @param projectIdx
     * @param taskIdx
     * @param taskDTO
     * @return
     */
    @PutMapping("/{taskIdx}")
    public ResponseEntity<TaskDTO> updateTask(
            @PathVariable Long projectIdx,
            @PathVariable Long taskIdx,
            @RequestBody TaskDTO taskDTO
    ){
        return ResponseEntity.status(HttpStatus.OK).body(taskService.update(projectIdx, taskIdx, taskDTO));
    }

    @PatchMapping("/{taskIdx}")
    public ResponseEntity<TaskDTO> updateTaskStatus(
            @PathVariable Long projectIdx,
            @PathVariable Long taskIdx,
            @RequestBody String status
    ){
        log.info("status : {}", status);
        return ResponseEntity.status(HttpStatus.OK).body(taskService.updateStatus(projectIdx, taskIdx, status));
    }

    /**
     * 작업 한개 삭제
     * @param projectIdx
     * @param taskIdx
     * @return
     */
    @DeleteMapping("/{taskIdx}")
    public ResponseEntity<String> deleteTask(
            @PathVariable Long projectIdx,
            @PathVariable Long taskIdx
    ){
        taskService.deleteTask(projectIdx, taskIdx);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Success");
    }

    /**
     * 작업 여러개 삭제
     * @param projectIdx
     * @param taskIdxs
     * @return
     */
    @DeleteMapping("/bulk")
    public ResponseEntity<String> deleteTasks(
            @PathVariable Long projectIdx,
            @RequestBody List<Long> taskIdxs
    ) {
        taskService.deleteTasks(projectIdx, taskIdxs);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Success");
    }
    


}