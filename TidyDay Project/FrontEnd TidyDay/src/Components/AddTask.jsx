import { useState, useEffect } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import"../Components/MyCalendar.css";
const AddTask = ({
  show,
  handleClose,
  showNotification,
  setAddSuccess,
  onTaskAdded, 
}) => {
  const [taskData, setTaskData] = useState({
    taskName: "",
    taskType: "ordinary",
    status: "to-do",
    priority: "low",
    projectId: "",
  });
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");

  const userId = location.state?.userId || localStorage.getItem('userId');

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch(`http://localhost:9090/projects/getProjectByUser/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const projectsData = await response.json();
          setProjects(projectsData);
        } else {
          console.log("Failed to fetch projects");
        }
      } catch (error) {
        console.log("Failed to fetch projects", error);
      }
    };
    getProjects();
  }, [userId]);

  const addTask = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.log("User ID is not defined");
      return;
    }

    const newTask = { ...taskData, project: { id: projectId }, userId };
    if (taskData.taskName.length > 0 && projectId) {
      try {
        const response = await fetch(`http://localhost:9090/tasks/addTask?userId=${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
          console.log("Task added");
          handleClose();
          setAddSuccess("Task added successfully!");
          showNotification("Task added successfully!");

          onTaskAdded(newTask);
        } else {
          console.log("Failed to add task");
        }
      } catch (error) {
        console.log("Failed to add task", error);
      }
    } else {
      console.log("Enter task name and select a project");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProjectChange = (event) => {
    setProjectId(event.target.value);
    setTaskData((prevData) => ({ ...prevData, projectId: event.target.value }));
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="fade"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
      }}
      dialogClassName="custom-modal"
    >
      <Form onSubmit={addTask}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "24px", fontWeight: "bold" }}>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "20px" }}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="taskName"
              value={taskData.taskName}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                color:"black"
              }}
            />
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3" style={{ fontWeight: "bold" }}>Project</Form.Label>
            <Col sm="9">
              <Form.Select
                value={projectId}
                onChange={handleProjectChange}
                required
                style={{
                  padding: "10px",
                  borderRadius: "4px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <option value="">--Select project--</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.projectName}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3" style={{ fontWeight: "bold" }}>Priority</Form.Label>
            <Col sm="9">
              <Form.Select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  borderRadius: "4px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <option value="low">Low</option>
                <option value="high">High</option>
              </Form.Select>
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{
              padding: "10px 20px",
              borderRadius: "4px",
              fontWeight: "bold",
              backgroundColor: "#2c2c2c"
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            style={{
              backgroundColor: "#0b2166",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            Save Task
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddTask;
