package com.example.backend_maven.Controller;

import com.example.backend_maven.Model.Picture;
import com.example.backend_maven.Repo.PictureRepo;
import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
@RequestMapping("/pictures")
@CrossOrigin(origins="http://localhost:3000")
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
            pictureRepo.save(pic);

            return ResponseEntity.ok("File uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }

}
