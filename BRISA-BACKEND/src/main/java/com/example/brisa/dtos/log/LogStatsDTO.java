package com.example.brisa.dtos.log;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.example.brisa.enums.LogAction;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogStatsDTO {
    private long totalLogs;
    private Map<LogAction, Long> logsByAction;
    private long logsToday;
    private long logsThisWeek;
    private long logsThisMonth;
}
