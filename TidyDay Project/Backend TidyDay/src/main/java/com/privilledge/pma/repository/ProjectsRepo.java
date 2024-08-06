package com.privilledge.pma.repository;

import com.privilledge.pma.model.Project;
import com.privilledge.pma.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectsRepo extends JpaRepository<Project,Long> {

    List<Project> findByUser(User user);
}
