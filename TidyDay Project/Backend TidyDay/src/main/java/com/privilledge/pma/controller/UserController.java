package com.privilledge.pma.controller;

import com.privilledge.pma.model.User;
import com.privilledge.pma.repository.UserRepo;
import com.privilledge.pma.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserRepo userRepo;
    private UserService userService;

    public UserController(UserRepo userRepo, UserService userService) {
        this.userRepo = userRepo;
        this.userService = userService;
    }

    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/userById/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userRepo.findById(id);
    }

    @GetMapping("/allUsers")
    public List<User> getUsers() {
        return userRepo.findAll();
    }
}
