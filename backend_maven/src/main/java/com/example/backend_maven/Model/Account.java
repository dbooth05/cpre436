package com.example.backend_maven.Model;


import jakarta.persistence.*;

@Entity
@Table(name="accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String email;

    private String pass;


    public Object getId() { return id; }

    public String getName() { return name; }

    public String getEmail() { return email; }

    public String getPass() { return pass; }

    public void setName(String name) { this.name = name; }

    public void setEmail(String email) { this.email = email; }

    public void setPass(String pass) { this.pass = pass; }

}
