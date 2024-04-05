package com.example.backend_maven.Repo;

import com.example.backend_maven.Model.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PictureRepo extends JpaRepository<Picture,Integer> {
}
