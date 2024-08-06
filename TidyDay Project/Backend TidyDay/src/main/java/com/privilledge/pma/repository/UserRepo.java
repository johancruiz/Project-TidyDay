package com.privilledge.pma.repository;

import com.privilledge.pma.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {
     User findUserByEmail(String email);

     User findUserByUsername(String username);


}
