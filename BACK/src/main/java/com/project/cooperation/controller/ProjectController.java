package com.project.cooperation.controller;

import com.project.cooperation.dto.ProjectDto;
import com.project.cooperation.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public ResponseEntity<Page<ProjectDto>> selectAllProject(
            @Valid @RequestParam(required = false) Long authorIdx,
            @PageableDefault(size = 5, page = 0) Pageable pageable){
        Page<ProjectDto> projectDtoPage = projectService.selectAllProject(authorIdx, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(projectDtoPage);
    }

    @PostMapping
    public ResponseEntity<ProjectDto> create(
            @Valid @RequestBody ProjectDto dto){
        ProjectDto createdProject = projectService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
    }

    @PutMapping("/{idx}")
    public ResponseEntity<ProjectDto> update(
            @PathVariable Long idx,
            @Valid @RequestBody ProjectDto dto){
        ProjectDto updatedProject = projectService.update(idx, dto);
        log.info("updatedProject : {}", updatedProject);
        return ResponseEntity.status(HttpStatus.OK).body(updatedProject);
    }

}
