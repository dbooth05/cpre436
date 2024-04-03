package com.example.backend_spring.Controllers;

import com.example.backend_spring.Model.Account;
import com.example.backend_spring.Repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins="http//localhost:3000")
public class AccountController {

    private AccountRepo accRepo;

    @Autowired
    public AccountController(AccountRepo accRepo) {
        this.accRepo = accRepo;
    }

    /**
     * To view all accounts in database
     * @return all accounts in the JSON form
     */
    @GetMapping
    public List<Account> getAccounts() {
        return accRepo.findAll();
    }

    /**
     * Attempts to create a new account
     * @param newAccount a incoming account in the form of JSON
     * @return message containing "success" if account created and the corresponding id
     */
    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody Account newAccount) {

        Map<String, Object> response = new HashMap<>();

        try {
            Account account = accRepo.save(newAccount);
            response.put("message", "success");
            response.put("id", newAccount.getId());
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            response.put("message", "username or email already in use");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Attempts to log in to existing account
     * @param account user/pass that is being attempted to log into
     * @return a success/fail message with id if account is logged into
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Account account) {
        Map<String, Object> response = new HashMap<>();

        Account acc = accRepo.findByName(account.getName());
//        System.out.println("username: " + account.getName() + "\npassword: " + account.getPass());
        if (acc != null && acc.getPass().equals(account.getPass())) {
            response.put("message", "success");
            response.put("id", acc.getId());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else if (acc == null) {
            response.put("message", "username does not exist");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        } else {
            response.put("message", "password is incorrect");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }
}
