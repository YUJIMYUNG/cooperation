package com.project.cooperation.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.IdGeneratorType;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.Id;

@Entity
@Table(name = "member")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class Member {

    @Id
    @Column(name = "member_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    @Column(name = "member_id")
    private String id;



}
