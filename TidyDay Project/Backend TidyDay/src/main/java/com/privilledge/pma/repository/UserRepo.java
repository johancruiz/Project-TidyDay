package com.privilledge.pma.repository;

import com.privilledge.pma.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
     // Buscar un usuario por su correo electrónico
     Optional<User> findByEmail(String email);

     // Buscar un usuario por su nombre de usuario
     Optional<User> findByUsername(String username);
}
