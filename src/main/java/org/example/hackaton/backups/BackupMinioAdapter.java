package org.example.hackaton.backups;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.hackaton.minioFile.properties.MinioProperties;
import org.example.hackaton.minioFile.service.MinioFileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;

@Slf4j
@Service
@RequiredArgsConstructor
public class BackupMinioAdapter {

    private final MinioFileService minioFileService;
    private final MinioProperties minioProperties;

    public String uploadBackup(File backupFile) {
        try {
            // Конвертируем File в MultipartFile для твоего сервиса
            MultipartFile multipartFile = createMultipartFile(backupFile);

            // Используем существующий метод upload
            String fileName = minioFileService.upload(
                    multipartFile,
                    minioProperties.getBucketNameBackups()
            );

            log.info("Backup '{}' uploaded successfully to MinIO bucket '{}'",
                    fileName, minioProperties.getBucketNameBackups());

            return fileName;
        } catch (Exception e) {
            log.error("Failed to upload backup to MinIO: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to upload backup to MinIO", e);
        }
    }

    private MultipartFile createMultipartFile(File file) throws IOException {
        return new MultipartFile() {
            @Override
            public String getName() {
                return file.getName();
            }

            @Override
            public String getOriginalFilename() {
                return file.getName();
            }

            @Override
            public String getContentType() {
                return "application/sql";
            }

            @Override
            public boolean isEmpty() {
                return file.length() == 0;
            }

            @Override
            public long getSize() {
                return file.length();
            }

            @Override
            public byte[] getBytes() throws IOException {
                return Files.readAllBytes(file.toPath());
            }

            @Override
            public FileInputStream getInputStream() throws IOException {
                return new FileInputStream(file);
            }

            @Override
            public void transferTo(File dest) throws IOException, IllegalStateException {
                Files.copy(file.toPath(), dest.toPath());
            }
        };
    }
}
