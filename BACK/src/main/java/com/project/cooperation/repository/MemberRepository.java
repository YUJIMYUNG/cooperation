package com.project.cooperation.repository;

import com.project.cooperation.model.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    @EntityGraph(attributePaths = {"memberRoleList"})
    @Query("select m from Member m where m.id = :id")
    Member getWithRoles(@Param("id") String id);

    //로그인 ID를 갖는 객체가 존재하는지에 대한 여부 -> 존재하면 true반환 (중복검사)
    boolean existsById(String id);

    //로그인 ID를 갖는 객체 반환
    Member findById(String id);

    // idx를 가지고 유저 찾기
    Optional<Member> findByIdx(Long idx);

}

