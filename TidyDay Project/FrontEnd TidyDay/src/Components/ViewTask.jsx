import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Modal, Button } from "react-bootstrap";
import EditTask from "./EditTask"; // Asegúrate de que la ruta sea correcta

function ViewTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [notification, setNotification] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskData, setTaskData] = useState({
    taskName: "",
    description: "",
    status: "",
    priority: "",
    project: {}
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getTask = async () => {
      try {
        const response = await fetch(`http://localhost:9090/tasks/taskById/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const taskResult = await response.json();
          setTask(taskResult);
          setTaskData(taskResult); // Inicializa taskData con los datos de la tarea
        } else {
          console.log("Failed to fetch task");
        }
      } catch (error) {
        console.log("Failed to fetch data", error);
      }
    };
    getTask();
  }, [id]);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const deleteTask = async () => {
    try {
      const response = await fetch(`http://localhost:9090/tasks/deleteTask/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setNotification("Task successfully deleted.");
        setTimeout(() => navigate(`/pma/tasks`), 2000);
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

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="container mt-3">
          <div className="view-task">
            <h2 className="fw-bold mb-4" id="color_fondo">Task Details</h2>
            <div className="task-details">
              <p id="color_fondo"><strong>Task Name:</strong> {task.taskName}</p>
              <p id="color_fondo"><strong>Description:</strong> {task.description}</p>
              <p id="color_fondo"><strong>Status:</strong> {task.status}</p>
              <p id="color_fondo"><strong>Priority:</strong> {task.priority}</p>
            </div>
            <h3 className="mt-4" id="color_fondo">Associated Project</h3>
            {task.project ? (
              <div className="list-group">
                <p><strong>Project Name:</strong> {task.project.projectName}</p>
                <p><strong>Status:</strong> {task.project.status}</p>
              </div>
            ) : (
              <p id="color_fondo">No project associated with this task.</p>
            )}
            <Button variant="info" className="mb-1" onClick={handleEditClick}>Edit Task</Button>
            <Button variant="danger" className="mb-1" onClick={() => setDeleteModal(true)}>Delete Task</Button>
          </div>
          {notification && <div className="notification" style={{ color: "005cc8" }}>{notification}</div>}
          <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title><h2>Confirm Delete</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: "005cc8" }}>Are you sure you want to delete this task?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setDeleteModal(false)}>Cancel</Button>
              <Button variant="danger" onClick={deleteTask}>Delete</Button>
            </Modal.Footer>
          </Modal>
          <EditTask
            show={showEditModal}
            handleClose={handleEditModalClose}
            taskData={taskData}
            setTaskData={setTaskData}
            setAddSuccess={(msg) => setNotification(msg)}
          />
        </div>
      </div>
    </>
  );
}

export default ViewTask;