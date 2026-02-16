package org.example.hackaton.minio.service;

import io.minio.*;
import io.minio.http.Method;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.example.hackaton.exception.ImageUploadException;
import org.example.hackaton.minio.db.ImageEntity;
import org.example.hackaton.minio.db.ImageRepository;
import org.example.hackaton.minio.properties.MinioProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final MinioClient minioClient;
    private final MinioProperties minioProperties;
    private final ImageRepository imageRepository;

    private final int EXPIRY_HOURS = 24;

    @Override
    public String upload(MultipartFile file) {
        try {
            createBucket();
        } catch (Exception e) {
            throw new ImageUploadException("Image upload failed " + e.getMessage());
        }

        if (file.isEmpty() || file.getOriginalFilename() == null) {
            throw new ImageUploadException("Image must have name");
        }

        String fileName = generateFileName(file);
        InputStream inputStream;
        try {
            inputStream = file.getInputStream();
        } catch (Exception e) {
            throw new ImageUploadException("Image upload failed " + e.getMessage());
        }

        saveImage(inputStream, fileName);
        return fileName;
    }

    @SneakyThrows
    @Override
    public String getLink(Long imageId) {
        ImageEntity image = imageRepository.findById(imageId)
                .orElseThrow(() -> new EntityNotFoundException("Image with id " + imageId + " does not exist"));
        String fileName = image.getImage();

        return minioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                        .bucket(minioProperties.getBucketName())
                        .object(fileName)
                        .method(Method.GET)
                        .expiry(EXPIRY_HOURS, TimeUnit.HOURS)
                        .build()
        );
    }

    @Override
    @SneakyThrows
    public void delete(Long imageId) {

        ImageEntity image = imageRepository.findById(imageId)
                .orElseThrow(() -> new EntityNotFoundException("Image with id " + imageId + " does not exist"));
        String fileName = image.getImage();

        minioClient.removeObject(RemoveObjectArgs.builder()
                .bucket(minioProperties.getBucketName())
                .object(fileName)
                .build());
        log.info("Файл удален: {}", fileName);

        imageRepository.delete(image);
    }

    @SneakyThrows
    private void createBucket() {
        boolean found = minioClient.bucketExists(BucketExistsArgs.builder()
                .bucket(minioProperties.getBucketName())
                .build());

        if (!found) {
            minioClient.makeBucket(MakeBucketArgs.builder()
                    .bucket(minioProperties.getBucketName())
                    .build());
        }
    }

    private String generateFileName(MultipartFile file) {
        String extension = getExtension(file);
        return UUID.randomUUID() + "." + extension;
    }

    private String getExtension(MultipartFile file) {
        return file.getOriginalFilename()
                .substring(file.getOriginalFilename().lastIndexOf(".") + 1);
    }

    @SneakyThrows
    private void saveImage(InputStream inputStream, String fileName) {
        minioClient.putObject(PutObjectArgs.builder()
                .stream(inputStream, inputStream.available(), -1)
                .bucket(minioProperties.getBucketName())
                .object(fileName)
                .build());

        ImageEntity imageEntity = new ImageEntity();
        imageEntity.setImage(fileName);
        imageRepository.save(imageEntity);
    }
}
