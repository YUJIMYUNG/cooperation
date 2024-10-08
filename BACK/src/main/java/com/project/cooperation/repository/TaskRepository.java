package com.project.cooperation.repository;

import com.project.cooperation.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t JOIN FETCH t.project WHERE t.project.idx = :projectIdx")
    List<Task> findAllByProjectIdxWithProject(@Param("projectIdx") Long projectIdx);

}
