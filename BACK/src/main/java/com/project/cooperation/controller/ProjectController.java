package com.project.cooperation.controller;

import com.project.cooperation.dto.ProjectDto;
import com.project.cooperation.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
            @RequestParam(required = false, defaultValue = "1") Long authorIdx,
            @PageableDefault(size = 10, page = 0) Pageable pageable){
        return projectService.selectAllProject(authorIdx, pageable);
    }
    @PostMapping
    public ResponseEntity<ProjectDto> create(@RequestBody ProjectDto dto){
        return projectService.create(dto);
    }

}
