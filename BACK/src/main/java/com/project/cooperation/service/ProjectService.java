package com.project.cooperation.service;

import com.project.cooperation.dto.ProjectDTO;
import com.project.cooperation.dto.ProjectPageDTO;
import com.project.cooperation.model.Member;
import com.project.cooperation.model.Project;
import com.project.cooperation.repository.MemberRepository;
import com.project.cooperation.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.ast.Not;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
    public ProjectPageDTO selectAllProject(Long authorIdx, Pageable pageable) {
        Sort sort = Sort.by(Sort.Direction.DESC, "endDate");
        Pageable pageableWithSort = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        Page<Project> projects = projectRepository.findAllByAuthor_Idx(authorIdx, pageableWithSort);
        Page<ProjectDTO> projectDTOs = projects.map(this::convertToDTO);
        return new ProjectPageDTO(projectDTOs);
    }

    /**
     * 프로젝트 생성 서비스
     * @param dto
     * @return
     */
    @Transactional
    public ProjectDTO create(ProjectDTO dto){
        Project project = convertToEntity(dto);
        Project savedDto = projectRepository.save(project);
        return convertToDTO(savedDto);
    }

    /**
     * 프로젝트 한개 조회
     */
    @Transactional(readOnly = true)
    public  ProjectDTO selectOne(Long idx){
        Project project = projectFindById(idx);
        return convertToDTO(project);
    }

    /**
     * 프로젝스 수정
     * @param idx
     * @param dto
     * @return
     */
    public ProjectDTO update(Long idx, ProjectDTO dto){
        if (!dto.getAuthor().equals(1L)) {
            throw new IllegalArgumentException("로그인 정보가 잘못되었습니다.");
        }

        Project project = projectFindById(idx);

        project.updateProject(dto.getTitle(), dto.getDescription(),dto.getStartDate(), dto.getEndDate());
        Project updatedProject = projectRepository.save(project);
        return convertToDTO(updatedProject);
    }

    public void delete(Long idx){
        Project project = projectFindById(idx);
        projectRepository.deleteById(idx);
    }

    /**
     * project를 projectDto로 변환해주는 함수
     * @param project
     * @return
     */
    private ProjectDTO convertToDTO(Project project) {
        return ProjectDTO.builder()
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
    private Project convertToEntity(ProjectDTO projectDto){
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

    /**
     * idx로 project찾기
     * @param projectIdx
     * @return
     */
    protected Project projectFindById(Long projectIdx){
        return projectRepository.findById(projectIdx)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with idx: " + projectIdx));
    }
}
