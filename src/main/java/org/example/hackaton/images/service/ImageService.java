package org.example.hackaton.images.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.hackaton.exception.FileUploadException;
import org.example.hackaton.images.db.ImageEntity;
import org.example.hackaton.images.db.ImageRepository;
import org.example.hackaton.minioFile.properties.MinioProperties;
import org.example.hackaton.minioFile.service.MinioFileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageService {
    private final MinioFileService minioFileService;
    private final MinioProperties minioProperties;
    private final ImageRepository imageRepository;

    public String uploadImage(MultipartFile file) {
        String contentType = file.getContentType();
        if (!contentType.startsWith("image/")) {
            log.error("Content-Type is not image");
            throw new FileUploadException("Content-Type is not image");
        }

        String fileName = minioFileService.upload(file, minioProperties.getBucketNamePhoto());

        ImageEntity imageEntity = new ImageEntity();
        imageEntity.setImage(fileName);
        imageRepository.save(imageEntity);

        return fileName;
    }

    public String getImageLink(Long imageId) {
        ImageEntity image = imageRepository.findById(imageId)
                .orElseThrow(() -> new EntityNotFoundException("Image with id " + imageId + " not found"));

        String fileName = image.getImage();

        return minioFileService.getLink(fileName, minioProperties.getBucketNamePhoto());
    }

    public void deleteImage(Long imageId) {
        ImageEntity image = imageRepository.findById(imageId)
                .orElseThrow(() -> new EntityNotFoundException("Image with id " + imageId + " does not exist"));
        String fileName = image.getImage();

        minioFileService.delete(fileName, minioProperties.getBucketNamePhoto());

        imageRepository.delete(image);
    }
}
