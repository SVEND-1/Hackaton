package org.example.hackaton.minio.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.hackaton.exception.ImageUploadException;
import org.example.hackaton.minio.service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    /**
     * Загрузка одного изображения
     */
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        log.info("📤 Запрос на загрузку: {}", file.getOriginalFilename());

        try {
            String fileName = imageService.upload(file);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Файл успешно загружен");
            response.put("fileName", fileName);
            response.put("originalName", file.getOriginalFilename());
            response.put("size", file.getSize());
            response.put("contentType", file.getContentType());

            // Формируем URL для доступа к файлу (если нужно)
            String fileUrl = "/api/images/" + fileName;
            response.put("url", fileUrl);

            return ResponseEntity.ok(response);

        } catch (ImageUploadException e) {
            log.error("Ошибка загрузки: {}", e.getMessage());

            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());

            return ResponseEntity.badRequest().body(error);

        } catch (Exception e) {
            log.error("Неожиданная ошибка: {}", e.getMessage());

            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", "Внутренняя ошибка сервера");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Получение ссылки на изображение
    @GetMapping("/{id}")
    public ResponseEntity<String> giveLinkToImage(
            @PathVariable("id") Long id
    ) {
        String url = imageService.getLink(id);

        return ResponseEntity.ok(url);
    }

    // Удаление изображения
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(
            @PathVariable("id") Long id
    ) {
        imageService.delete(id);

        return ResponseEntity.ok().build();
    }

}
