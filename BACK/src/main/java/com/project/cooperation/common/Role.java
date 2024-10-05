package com.project.cooperation.common;

import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public enum Role {
    USER, ADMIN;
}
