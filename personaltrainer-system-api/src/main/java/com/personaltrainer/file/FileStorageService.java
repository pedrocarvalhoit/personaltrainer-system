package com.personaltrainer.file;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;
    private final List<String> allowedMimeTypes = Arrays.asList("image/jpeg", "image/png", "image/gif");

    public FileStorageService(@Value("${file.upload-dir}") String uploadDir){
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try{
            Files.createDirectories(this.fileStorageLocation);
        }catch (Exception ex){
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file, String userId, String clientId){
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try{
            if(!allowedMimeTypes.contains(file.getContentType())){
                throw new RuntimeException("File type not allowed" + file.getContentType());
            }
            Path relativePath = Paths.get("users", userId, "clients", clientId, fileName);
            Path targetLocation = this.fileStorageLocation.resolve(relativePath);

            Files.createDirectories(targetLocation.getParent());
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return targetLocation.toString(); // Retornar caminho absoluto
        }catch (IOException ex){
            throw new RuntimeException("Could not store file, please try againd", ex);
        }
    }

}
