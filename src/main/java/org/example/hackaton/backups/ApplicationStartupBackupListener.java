package org.example.hackaton.backups;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.hackaton.backups.service.DatabaseBackupService;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ApplicationStartupBackupListener {

    private final DatabaseBackupService backupService;

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationStartup() {
        log.info("Application started, creating initial backup");
        try {
            backupService.createBackup();
            log.info("Initial backup completed successfully");
        } catch (Exception e) {
            log.error("Initial backup failed: {}", e.getMessage(), e);
        }
    }
}
