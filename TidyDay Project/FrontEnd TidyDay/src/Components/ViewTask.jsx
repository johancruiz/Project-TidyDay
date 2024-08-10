import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function ViewTask() {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [projects, setProjects] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTaskAndProjects = async () => {
      try {
        // Fetch the task details
        const taskResponse = await fetch(`http://localhost:9090/tasks/getTask/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (taskResponse.ok) {
          const taskResult = await taskResponse.json();
          setTask(taskResult);

          // Fetch the projects associated with the task
          const projectsResponse = await fetch(`http://localhost:9090/tasks/getProjectsByTask/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (projectsResponse.ok) {
            const projectsResult = await projectsResponse.json();
            setProjects(projectsResult);
          } else {
            console.log("Failed to fetch projects");
          }
        } else {
          console.log("Failed to fetch task");
        }
      } catch (error) {
        console.log("Failed to fetch data", error);
      }
    };
    getTaskAndProjects();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:9090/tasks/deleteTask/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/pma/tasks");
      } else {
        console.log("Failed to delete task");
      }
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const handleEdit = async () => {
    // Logic to handle task editing
    console.log("Edit task logic goes here");
  };

  const handleCloseDeleteModal = () => setDeleteModal(false);
  const handleShowDeleteModal = () => setDeleteModal(true);

  return (
    <>
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="container mt-3">
          <div className="view-task">
            <h2 className="fw-bold mb-4">Task Details</h2>
            <div className="task-details">
              <p><strong>Task Name:</strong> {task.taskName}</p>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
            </div>
            <h3 className="mt-4">Associated Projects</h3>
            {projects.length > 0 ? (
              <ul className="list-group">
                {projects.map((project) => (
                  <li key={project.id} className="list-group-item">
                    <p><strong>Project Name:</strong> {project.projectName}</p>
                    <p><strong>Status:</strong> {project.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No projects associated with this task.</p>
            )}
            <button className="btn btn-primary mt-3" onClick={handleEdit}>Edit Task</button>
            <button className="btn btn-danger ms-2 mt-3" onClick={handleShowDeleteModal}>Delete Task</button>
          </div>
          {deleteModal && (
            <div className="modal">
              <div className="modal-content">
                <h4>Are you sure you want to delete this task?</h4>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                <button className="btn btn-secondary ms-2" onClick={handleCloseDeleteModal}>Cancel</button>
              </div>
            </div>
          )}
          {notification && <div className="notification">{notification}</div>}
        </div>
      </div>
    </>
  );
}

export default ViewTask;
