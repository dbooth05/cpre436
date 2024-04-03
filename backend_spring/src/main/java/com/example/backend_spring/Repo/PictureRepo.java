package com.example.backend_spring.Repo;

import com.example.backend_spring.Model.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface PictureRepo extends JpaRepository<Picture, Integer> {
//    void save(String sql, String userId, LocalDateTime now, String path);
}
