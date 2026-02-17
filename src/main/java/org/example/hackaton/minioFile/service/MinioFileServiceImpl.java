package org.example.hackaton.minioFile.service;

import io.minio.*;
import io.minio.http.Method;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.example.hackaton.exception.FileUploadException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class MinioFileServiceImpl implements MinioFileService {

    private final MinioClient minioClient;

    private final int EXPIRY_HOURS = 24;

    @Override
    public String upload(MultipartFile file, String bucketName) {
        try {
            createBucketIfNotExist(bucketName);
        } catch (Exception e) {
            throw new FileUploadException("File upload failed " + e.getMessage());
        }

        if (file.isEmpty() || file.getOriginalFilename() == null) {
            throw new FileUploadException("File must have name");
        }

        String fileName = generateFileName(file);
        InputStream inputStream;
        try {
            inputStream = file.getInputStream();
        } catch (Exception e) {
            throw new FileUploadException("File upload failed " + e.getMessage());
        }

        saveFile(inputStream, fileName, bucketName);
        return fileName;
    }

    @SneakyThrows
    @Override
    public String getLink(String fileName, String bucketName) {

        return minioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                        .bucket(bucketName)
                        .object(fileName)
                        .method(Method.GET)
                        .expiry(EXPIRY_HOURS, TimeUnit.HOURS)
                        .build()
        );
    }

    @Override
    @SneakyThrows
    public void delete(String fileName, String bucketName) {
        minioClient.removeObject(RemoveObjectArgs.builder()
                .bucket(bucketName)
                .object(fileName)
                .build());
        log.info("Файл удален: {}", fileName);
    }

    @SneakyThrows
    private void createBucketIfNotExist(String bucketName) {
        boolean found = minioClient.bucketExists(BucketExistsArgs.builder()
                .bucket(bucketName)
                .build());

        if (!found) {
            minioClient.makeBucket(MakeBucketArgs.builder()
                    .bucket(bucketName)
                    .build());
        }
    }

    private String generateFileName(MultipartFile file) {
        String extension = getExtension(file);
        return UUID.randomUUID() + "." + extension;
    }

    private String getExtension(MultipartFile file) {
        file.getContentType();
        return file.getOriginalFilename()
                .substring(file.getOriginalFilename().lastIndexOf(".") + 1);
    }

    @SneakyThrows
    private void saveFile(InputStream inputStream, String fileName, String bucketName) {
        minioClient.putObject(PutObjectArgs.builder()
                .stream(inputStream, inputStream.available(), -1)
                .bucket(bucketName)
                .object(fileName)
                .build());
    }
}
