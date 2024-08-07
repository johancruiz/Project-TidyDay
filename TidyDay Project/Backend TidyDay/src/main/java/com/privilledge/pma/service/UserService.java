package com.privilledge.pma.service;

import com.privilledge.pma.model.User;
import com.privilledge.pma.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public Optional<User> findById(Long id) {
        return userRepo.findById(id);
    }

    public List<User> findAll() {
        return userRepo.findAll();
    }

    public User authenticateUser(String email, String password) throws Exception {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Exception("Invalid password");
        }

        return user;
    }
}
