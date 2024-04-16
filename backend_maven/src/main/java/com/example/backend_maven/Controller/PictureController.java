package com.example.backend_maven.Controller;

import com.example.backend_maven.Model.Picture;
import com.example.backend_maven.Repo.PictureRepo;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.transaction.support.TransactionSynchronizationManager.getResource;

@RestController
@RequestMapping("/pictures")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080", "http://104.190.100.80"})
public class PictureController {

    private PictureRepo pictureRepo;

    @Autowired
    public PictureController(PictureRepo pictureRepo) {
        this.pictureRepo = pictureRepo;
    }

    @GetMapping
    public List<Picture> getPictures() {
        return pictureRepo.findAll();
    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        Resource file = (Resource) getResource("file:/var/www/uploads/" + filename);
        return ResponseEntity.ok().body(file);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile img, @RequestParam("userID") String userID) {
        try {
            byte[] bytes = img.getBytes();
            Path path = Paths.get("/var/www/uploads/" + img.getOriginalFilename());
            Files.write(path, bytes);

            Picture pic = new Picture();
            pic.setUserID(Integer.parseInt(userID));
            pic.setUploaded(LocalDateTime.now());
            pic.setImgPath(path.toString());

            try {
                pictureRepo.save(pic);
                return ResponseEntity.ok("File uploaded and picture saved successfully");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save picture");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }

}
