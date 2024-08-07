package com.privilledge.pma.controller;

import com.privilledge.pma.model.User;
import com.privilledge.pma.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        try {
            User savedUser = userService.saveUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/userById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.findById(id)
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestParam String email, @RequestParam String password) {
        try {
            User user = userService.authenticateUser(email, password);

            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signUp(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        try {
            userService.saveUser(user); // Guardar el usuario
            response.put("message", "User registered successfully");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            response.put("message", "User registration failed");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

}
