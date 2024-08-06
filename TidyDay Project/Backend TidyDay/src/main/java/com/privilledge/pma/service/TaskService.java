package com.privilledge.pma.service;

import com.privilledge.pma.model.Project;
import com.privilledge.pma.model.Task;
import com.privilledge.pma.model.User;
import com.privilledge.pma.repository.ProjectsRepo;
import com.privilledge.pma.repository.TaskRepository;
import com.privilledge.pma.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepo userRepo;

    private final ProjectsRepo projectRepo;

    public TaskService(TaskRepository taskRepository, UserRepo userRepo, ProjectsRepo projectsRepo) {
        this.taskRepository = taskRepository;
        this.userRepo = userRepo;
        this.projectRepo = projectsRepo;
    }


    public void addTask(Task task, Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        task.setUser(user);

        // Verifica si el proyecto existe y luego lo asigna
        if (task.getProject() != null && task.getProject().getId() != null) {
            Project project = projectRepo.findById(task.getProject().getId())
                    .orElseThrow(() -> new RuntimeException("Project not found"));
            task.setProject(project);
        } else {
            throw new RuntimeException("Project must be provided");
        }

        taskRepository.save(task);
    }



    public List<Task> getTasks() {
        return taskRepository.findAll();
    }


    public List<Task> getTaskByUser(User user) {
        return taskRepository.findByUser(user);
    }
}
