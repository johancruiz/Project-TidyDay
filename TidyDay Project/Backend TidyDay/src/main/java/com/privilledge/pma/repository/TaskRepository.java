package com.privilledge.pma.repository;

import com.privilledge.pma.model.Task;
import com.privilledge.pma.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findByUser(User user);
}
