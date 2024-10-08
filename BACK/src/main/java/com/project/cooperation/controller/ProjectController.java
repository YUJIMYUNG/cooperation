package com.project.cooperation.controller;

import com.project.cooperation.dto.ProjectDTO;
import com.project.cooperation.dto.ProjectPageDTO;
import com.project.cooperation.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<ProjectPageDTO> selectAllProject(
            @Valid @RequestParam(required = false) Long authorIdx,
            @PageableDefault(size = 5, page = 0) Pageable pageable){
        ProjectPageDTO projectDtoPage = projectService.selectAllProject(authorIdx, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(projectDtoPage);
    }

    @GetMapping("/{idx}")
    public ResponseEntity<ProjectDTO> selectProject(
            @PathVariable Long idx
    ){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.selectOne(idx));
    }

    @PostMapping
    public ResponseEntity<ProjectDTO> create(
            @Valid @RequestBody ProjectDTO dto){
        ProjectDTO createdProject = projectService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
    }


    @PutMapping("/{idx}")
    public ResponseEntity<ProjectDTO> update(
            @PathVariable Long idx,
            @Valid @RequestBody ProjectDTO dto){
        ProjectDTO updatedProject = projectService.update(idx, dto);
        log.info("updatedProject : {}", updatedProject);
        return ResponseEntity.status(HttpStatus.OK).body(updatedProject);
    }

    @DeleteMapping("/{idx}")
    public ResponseEntity<String> delete(@PathVariable Long idx){
        projectService.delete(idx);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("성공적으로 삭제되었습니다.");
    }

}
