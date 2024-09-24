package com.project.cooperation.service;

import com.project.cooperation.dto.ProjectDTO;
import com.project.cooperation.repository.MemberRepository;
import com.project.cooperation.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;

    private ResponseEntity<Page<ProjectDTO>> selectAllProject(){
        return null;
    }

}
