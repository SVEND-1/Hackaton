package org.example.hackaton.backups.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.hackaton.backups.BackupMinioAdapter;
import org.example.hackaton.backups.properties.BackupProperties;
import org.example.hackaton.minioFile.properties.MinioProperties;
import org.example.hackaton.minioFile.service.MinioFileService;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class DatabaseBackupService {

    private final BackupProperties backupProperties;
    private final MinioProperties minioProperties;
    private final BackupMinioAdapter backupMinioAdapter;

    public String createBackup() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String fileName = String.format("%s_%s.sql",
                backupProperties.getFilenamePrefix(), timestamp);
        String filePath = backupProperties.getDirectory() + File.separator + fileName;

        try {
            // Создаем директорию если не существует
            createBackupDirectory();

            // Выполняем pg_dump
            executePgDump(filePath);
            log.info("Backup created successfully: {}", filePath);

            // Загружаем в MinIO через адаптер
            File backupFile = new File(filePath);
            String uploadedFileName = backupMinioAdapter.uploadBackup(backupFile);
            log.info("Backup uploaded to MinIO with name: {}", uploadedFileName);

            // Очищаем старые бэкапы
            cleanupOldBackups();

            return filePath;
        } catch (Exception e) {
            log.error("Failed to create backup: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to create database backup", e);
        }
    }

    private void createBackupDirectory() {
        File directory = new File(backupProperties.getDirectory());
        if (!directory.exists()) {
            boolean created = directory.mkdirs();
            if (created) {
                log.info("Backup directory created: {}", backupProperties.getDirectory());
            }
        }
    }

    private void executePgDump(String filePath) throws IOException, InterruptedException {
        String[] command = {
                "pg_dump",
                "-h", "localhost",
                "-p", "5432",
                "-U", "postgres",
                "-d", backupProperties.getDatabaseName(),
                "-f", filePath,
                "-F", "c"
        };

        ProcessBuilder processBuilder = new ProcessBuilder(command);
        processBuilder.environment().put("PGPASSWORD", "svend123");

        Process process = processBuilder.start();
        int exitCode = process.waitFor();

        if (exitCode != 0) {
            throw new RuntimeException("pg_dump failed with exit code: " + exitCode);
        }
    }

    private void cleanupOldBackups() {
        File backupDir = new File(backupProperties.getDirectory());
        File[] files = backupDir.listFiles((dir, name) ->
                name.startsWith(backupProperties.getFilenamePrefix()) && name.endsWith(".sql"));

        if (files == null) return;

        long cutoffTime = System.currentTimeMillis() -
                (backupProperties.getRetentionDays() * 24L * 60 * 60 * 1000);

        for (File file : files) {
            if (file.lastModified() < cutoffTime) {
                boolean deleted = file.delete();
                if (deleted) {
                    log.info("Deleted old backup: {}", file.getName());
                }
            }
        }
    }
}