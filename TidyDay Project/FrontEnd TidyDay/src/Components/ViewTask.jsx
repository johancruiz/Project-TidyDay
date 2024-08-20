import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, ModalTitle } from "react-bootstrap";

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
        const taskResponse = await fetch(`http://localhost:9090/tasks/taskById/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (taskResponse.ok) {
          const taskResult = await taskResponse.json();
          setTask(taskResult);

          // Fetch the projects associated with the taskkkkkkk
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

  const handleEdit = () => {
    // Implement task editing logic
    console.log("Edit task logic goes here");
  };

  const deleteTask = async () => {
    try {
      const response = await fetch(`http://localhost:9090/tasks/deleteTask/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setNotification("Task successfully deleted.");
        setTimeout(() => navigate(`/pma/tasks`), 2000); // Redirect after 2 seconds
      } else {
        setNotification("Failed to delete task.");
      }
    } catch (error) {
      console.log("Failed to delete task", error);
      setNotification("Failed to delete task.");
    } finally {
      setDeleteModal(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="container mt-3">
          <div className="view-task">
            <h2 className="fw-bold mb-4" id="color_fondo" >Task Details</h2>
            <div className="task-details">
              <p id="color_fondo" ><strong id="color_fondo" >Task Name:</strong> {task.taskName}</p>
              <p id="color_fondo"><strong id="color_fondo">Description:</strong> {task.description}</p>
              <p id="color_fondo"><strong id="color_fondo">Status:</strong> {task.status}</p>
              <p id="color_fondo"><strong id="color_fondo">Priority:</strong> {task.priority}</p>
            </div>
            <h3 className="mt-4" id="color_fondo">Associated Projects</h3>
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
              <p id="color_fondo" >No projects associated with this task.</p>
            )}
            <Button variant="info" className="mb-1" onClick={handleEdit}>Edit Task</Button>
            <Button variant="danger" className="mb-1" onClick={() => setDeleteModal(true)}>Delete Task</Button>
          </div>
          {notification && <div className="notification" style={{ color: "005cc8" }}>{notification}</div>}
          <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
            <ModalHeader closeButton>
              <ModalTitle><h2>Confirm Delete</h2></ModalTitle>
            </ModalHeader>
            <ModalBody style={{ color: "005cc8" }} >Are you sure you want to delete this task?</ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={() => setDeleteModal(false)}>Cancel</Button>
              <Button variant="danger" onClick={deleteTask}>Delete</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default ViewTask;
