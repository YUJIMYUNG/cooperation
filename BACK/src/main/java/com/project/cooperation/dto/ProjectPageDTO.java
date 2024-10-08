package com.project.cooperation.dto;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
public class ProjectPageDTO {
    private List<ProjectDTO> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;

    public ProjectPageDTO(Page<ProjectDTO> page) {
        this.content = page.getContent();
        this.pageNumber = page.getNumber();
        this.pageSize = page.getSize();
        this.totalElements = page.getTotalElements();
        this.totalPages = page.getTotalPages();
    }
}
