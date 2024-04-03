package com.example.backend_spring.Repo;

import com.example.backend_spring.Model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepo extends JpaRepository<Account,Integer> {

    Account findByName(String name);
}
