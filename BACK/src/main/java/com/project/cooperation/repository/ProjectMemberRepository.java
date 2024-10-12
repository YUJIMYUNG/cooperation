package com.project.cooperation.repository;

import com.project.cooperation.dto.ProjectMemberId;
import com.project.cooperation.model.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, ProjectMemberId> {

    void deleteAllByProject_Idx(Long projectIdx);
}
