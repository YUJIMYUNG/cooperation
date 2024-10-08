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

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks(@PathVariable Long projectIdx){
        return ResponseEntity.status(HttpStatus.FOUND).body(taskService.getAllTasks(projectIdx));
    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(
            @PathVariable Long projectIdx,
            @RequestBody TaskDTO task){
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(projectIdx, task));
    }

    @PutMapping("/{taskIdx}")
    public ResponseEntity<TaskDTO> updateTask(
            @PathVariable Long projectIdx,
            @PathVariable Long taskIdx,
            @RequestBody TaskDTO taskDTO
    ){
        log.info("taskDTO : {}", taskDTO);
        return ResponseEntity.status(HttpStatus.OK).body(taskService.update(projectIdx, taskIdx, taskDTO));
    }

}
