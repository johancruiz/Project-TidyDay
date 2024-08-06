package com.privilledge.pma.service;

import com.privilledge.pma.model.Project;
import com.privilledge.pma.model.User;
import com.privilledge.pma.repository.ProjectsRepo;
import com.privilledge.pma.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectsService {

    @Autowired
    private ProjectsRepo projectsRepo;
    @Autowired
    private UserRepo userRepo;

    public String addProject(Project project) {
        // Optionally, handle user association if needed
        // User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        // project.setUser(user);
        projectsRepo.save(project);
        return "Project saved";
    }

    public List<Project> getProjects() {
        return projectsRepo.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectsRepo.findById(id);
    }

    public List<Project> getByUser(User user) {
        return projectsRepo.findByUser(user);
    }
}
