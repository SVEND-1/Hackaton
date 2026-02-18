package org.example.hackaton.backups;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.hackaton.backups.service.DatabaseBackupService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class BackupScheduler {

    private final DatabaseBackupService backupService;

    @Scheduled(initialDelayString = "${backup.schedule.initial-delay}",
            fixedDelayString = "${backup.schedule.fixed-delay}")
    public void scheduledBackup() {
        log.info("Starting scheduled backup");
        try {
            backupService.createBackup();
            log.info("Scheduled backup completed successfully");
        } catch (Exception e) {
            log.error("Scheduled backup failed: {}", e.getMessage(), e);
        }
    }
}
