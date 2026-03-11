package com.example.brisa.dtos.log;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.example.brisa.enums.LogAction;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SystemLogDTO {
    private Long id;
    private LogAction action;
    private String description;
    private String entityType;
    private String entityId;
    private UUID userId;
    private String userName;
    private String userEmail;
    private String ipAddress;
    private String userAgent;
    private String details;
    private LocalDateTime createdAt;
}
