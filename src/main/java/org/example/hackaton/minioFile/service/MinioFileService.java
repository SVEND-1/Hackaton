package org.example.hackaton.minioFile.service;

import org.springframework.web.multipart.MultipartFile;

public interface MinioFileService {
    String upload(MultipartFile file, String bucketName);
    String getLink(String imageId, String bucketName);
    void delete(String fileName, String bucketName);
}
