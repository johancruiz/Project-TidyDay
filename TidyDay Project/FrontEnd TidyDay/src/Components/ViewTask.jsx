import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Modal, Button, Card, Alert, Badge } from "react-bootstrap";
import EditTask from "./EditTask";

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
          setTaskData(taskResult);
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
        <div className="container mt-4">
          <Card className="shadow-sm" style={{ backgroundColor: "#020817", color: "#fff" }}>
            <Card.Header className=" text-light" style={{ backgroundColor: "#0b5ed7", color: "#fff" }}>
              <h4>Task Details</h4>
            </Card.Header>
            <Card.Body>
              <div className="task-details">
                <h5 className="fw-bold mb-3">Task Name: <span >{task.taskName}</span></h5>
                <hr className="my-4" />
                <p className="mb-4"><strong>Description:</strong> {task.description}</p>
                <hr className="my-4" />
                <div className="mb-4">
                  <strong>Status:</strong> <Badge pill bg={task.status === "Completed" ? "success" : "warning"}>{task.status}</Badge>
                  <hr className="my-4" />
                </div>
                <div className="mb-4">
                  <strong>Priority:</strong> <Badge pill bg={task.priority === "High" ? "danger" : "info"}>{task.priority}</Badge>
                  <hr className="my-4" />
                </div>
              </div>
              <h6 className="fw-bold mb-3">Associated Project</h6>
              
              {task.project ? (
                <div className="list-group">
                  <p className="mb-2"><strong>Project Name:</strong> {task.project.projectName}</p>
                  
                  <p className="mb-0"><strong>Status:</strong> <Badge pill bg={task.project.status === "Active" ? "success" : "secondary"}>{task.project.status}</Badge></p>
                </div>
              ) : (
                <p className="mb-0">No project associated with this task.</p>
              )}
              <div className="mt-4">
              <hr className="my-4" />
                <Button variant="primary" className="me-2" onClick={handleEditClick}>Edit Task</Button>
                <Button variant="danger" onClick={() => setDeleteModal(true)}>Delete Task</Button>
              </div>
            </Card.Body>
          </Card>
          {notification && <Alert variant="info" className="mt-3">{notification}</Alert>}
          <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
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