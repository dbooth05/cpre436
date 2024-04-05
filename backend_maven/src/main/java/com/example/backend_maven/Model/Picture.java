package com.example.backend_maven.Model;

import jakarta.persistence.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Entity
@Table(name = "pictures")
public class Picture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int imgID;

    private String imgName;

    private int userID;

    private LocalDateTime uploaded;

    private String imgPath;

    public int getImgID() { return imgID; }

    public String getImgName() { return imgName; }

    public int getUserID() { return userID; }

    public LocalDateTime getUploaded() { return uploaded; }

    public String getImgPath() { return imgPath; }


    public void setImgID(int imgID) { this.imgID = imgID; }

    public void setImgName(String imgName) { this.imgName = imgName; }

    public void setUserID(int userID) { this.userID = userID; }

    public void setUploaded(LocalDateTime uploaded) { this.uploaded = uploaded; }

    public void setImgPath(String imgPath) { this.imgPath = imgPath; }

}
