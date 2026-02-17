package org.example.hackaton.minio.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    String upload(MultipartFile file);
    String getLink(Long imageId);
    void delete(Long imageId);
}
