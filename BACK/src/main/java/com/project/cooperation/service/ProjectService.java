package com.project.cooperation.service;

import com.project.cooperation.dto.ProjectDto;
import com.project.cooperation.model.Member;
import com.project.cooperation.model.Project;
import com.project.cooperation.repository.MemberRepository;
import com.project.cooperation.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional(readOnly = true)
    public Page<ProjectDto> selectAllProject(Long authorIdx, Pageable pageable) {
        Sort sort = Sort.by(Sort.Direction.DESC, "endDate");
        Pageable pageableWithSort = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        Page<Project> projects = projectRepository.findAllByAuthor_Idx(authorIdx, pageableWithSort);
        return projects.map(this::convertToDTO);
    }

    /**
     * 프로젝트 생성 서비스
     * @param dto
     * @return
     */
    @Transactional
    public ProjectDto create(ProjectDto dto){
        Project project = convertToEntity(dto);
        Project savedDto = projectRepository.save(project);
        return convertToDTO(savedDto);
    }

    /**
     * 프로젝스 수정
     * @param idx
     * @param dto
     * @return
     */
    public ProjectDto update(Long idx, ProjectDto dto){
        if (!dto.getAuthor().equals(1L)) {
            throw new IllegalArgumentException("로그인 정보가 잘못되었습니다.");
        }

        Project project = projectRepository.findById(idx)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with idx: " + idx));
        project.updateProject(dto.getTitle(), dto.getDescription(),dto.getStartDate(), dto.getEndDate());
        Project updatedProject = projectRepository.save(project);
        return convertToDTO(updatedProject);
    }

    public void delete(Long idx){
        Project project = projectRepository.findById(idx)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with idx: " + idx));
        projectRepository.deleteById(idx);
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
