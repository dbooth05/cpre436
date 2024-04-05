package com.example.backend_maven.Repo;

import com.example.backend_maven.Model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepo extends JpaRepository<Account,Integer> {

    Account findByName(String name);
}
