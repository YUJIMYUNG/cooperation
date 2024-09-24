package com.project.cooperation.controller;

import com.project.cooperation.dto.ProjectDTO;
import com.project.cooperation.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping
    private ResponseEntity<Page<ProjectDTO>> selectAllProject(@PageableDefault(size = 10) Pageable pageable){
        return null;
    }

}
