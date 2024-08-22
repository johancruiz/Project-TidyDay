package com.privilledge.pma.controller;

import com.privilledge.pma.model.Project;
import com.privilledge.pma.model.Task;
import com.privilledge.pma.model.User;
import com.privilledge.pma.repository.ProjectsRepo;
import com.privilledge.pma.repository.TaskRepository;
import com.privilledge.pma.repository.UserRepo;
import com.privilledge.pma.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;
    private final TaskRepository taskRepository;
    private final UserRepo userRepo;
    private final ProjectsRepo projectsRepo; // Usa ProjectsRepo en lugar de ProjectRepository

    public TaskController(TaskService taskService, TaskRepository taskRepository, UserRepo userRepo, ProjectsRepo projectsRepo) {
        this.taskService = taskService;
        this.taskRepository = taskRepository;
        this.userRepo = userRepo;
        this.projectsRepo = projectsRepo; // Inicializa el repositorio de proyectos
    }

    @PostMapping("/addTask")
    public ResponseEntity<String> addTask(@RequestBody Task task, @RequestParam Long userId) {
        try {
            taskService.addTask(task, userId);
            return ResponseEntity.ok("Task added successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding task: " + e.getMessage());
        }
    }

    @GetMapping("/getTasks")
    public List<Task> getAllTasks() {
        return taskService.getTasks();
    }

    @GetMapping("/taskById/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskRepository.findById(id);
        return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()) {
            taskRepository.delete(task.get());
            return ResponseEntity.ok("Task deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/editTask/{id}")
    public ResponseEntity<String> editTask(@RequestBody Task task, @PathVariable Long id) {
        Optional<Task> existingTask = taskRepository.findById(id);
        if (existingTask.isPresent()) {
            Task newTask = existingTask.get();
            newTask.setTaskName(task.getTaskName());
            newTask.setTaskType(task.getTaskType());
            newTask.setStatus(task.getStatus());
            newTask.setPriority(task.getPriority());
            newTask.setProject(task.getProject());
            taskRepository.save(newTask);
            return ResponseEntity.ok("Task updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updateTask/{id}")
    public ResponseEntity<String> updateTaskStatus(@PathVariable Long id, @RequestBody Task task) {
        Optional<Task> existingTask = taskRepository.findById(id);
        if (existingTask.isPresent()) {
            Task updateTask = existingTask.get();
            updateTask.setStatus(task.getStatus());
            updateTask.setPriority(task.getPriority());
            taskRepository.save(updateTask);
            return ResponseEntity.ok("Task status updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getTasksByUser")
    public ResponseEntity<List<Task>> getTasksByUser(@RequestParam Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(taskService.getTaskByUser(user));
    }
    
    @GetMapping("/getAllProjects")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectsRepo.findAll(); // Usa projectsRepo para obtener todos los proyectos
        return ResponseEntity.ok(projects);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        Optional<Project> project = projectsRepo.findById(id);
        if (project.isPresent()) {
            projectsRepo.delete(project.get());
            return ResponseEntity.ok("Project deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
