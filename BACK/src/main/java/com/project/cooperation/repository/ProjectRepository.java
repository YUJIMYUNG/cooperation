package com.project.cooperation.repository;

import com.project.cooperation.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("SELECT DISTINCT p FROM Project p JOIN p.projectMembers pm WHERE pm.member.idx = :memberIdx")
    Page<Project> findProjectsByMemberIdx(@Param("memberIdx") Long memberIdx, Pageable pageable);
}