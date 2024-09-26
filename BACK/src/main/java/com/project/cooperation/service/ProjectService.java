package com.project.cooperation.service;

import com.project.cooperation.dto.ProjectDto;
import com.project.cooperation.model.Member;
import com.project.cooperation.model.Project;
import com.project.cooperation.repository.MemberRepository;
import com.project.cooperation.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;

    /**
     * 로그인 한 유저가 만들거나 포함된 프로젝트 조회 서비스
     * @param authorIdx
     * @param pageable
     * @return
     */
    public ResponseEntity<Page<ProjectDto>> selectAllProject(Long authorIdx, Pageable pageable) {
        Page<Project> projects = projectRepository.findAllByAuthor_Idx(authorIdx, pageable);
        Page<ProjectDto> projectDTOs = projects.map(this::convertToDTO);
        return new ResponseEntity<>(projectDTOs, HttpStatus.OK);
    }

    /**
     * 프로젝트 생성 서비스
     * @param dto
     * @return
     */
    public ResponseEntity<ProjectDto> create(ProjectDto dto){
        Project project = convertToEntity(dto);
        log.info("project : " + project);
        Project savedDto = projectRepository.save(project);
        log.info("savedDto : " + savedDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedDto));
    }

    /**
     * project를 projectDto로 변환해주는 함수
     * @param project
     * @return
     */
    private ProjectDto convertToDTO(Project project) {
        return ProjectDto.builder()
                .author(project.getAuthor().getIdx())
                .idx(project.getIdx())
                .title(project.getTitle())
                .description(project.getDescription())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())
                .build();
    }

    /**
     * projectDto를 project로 변환해주는 함수
     * @param projectDto
     * @return
     */
    private Project convertToEntity(ProjectDto projectDto){
        Member member = memberRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Member Not Found"));

        return Project.builder()
                .author(member)
                .title(projectDto.getTitle())
                .description(projectDto.getDescription())
                .startDate(projectDto.getStartDate())
                .endDate(projectDto.getEndDate())
                .build();
    }
}
