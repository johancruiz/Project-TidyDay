package com.privilledge.pma.service;

import com.privilledge.pma.model.User;
import com.privilledge.pma.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public String login(String email, String password) {
        User user = userRepo.findUserByEmail(email);
        if (user != null && bCryptPasswordEncoder.matches(password, user.getPassword())) {
            return "User logged in";
        } else {
            return "Invalid login";
        }
    }


    public Map<String, String> authenticateUser(String email, String password) {
        User user = userRepo.findUserByEmail(email);
        if (user != null && bCryptPasswordEncoder.matches(password, user.getPassword())) {
            Map<String, String> response = new HashMap<>();
            response.put("username", user.getUsername());
            return response;
        }
        return null; // Return null if authentication fails
    }

}
