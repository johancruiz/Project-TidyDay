import { useEffect, useState } from "react";
import { Modal, Col } from "react-bootstrap";
import { useParams } from "react-router";

function EditTask({ handleClose, show, taskData, setTaskData, setAddSuccess }) {
  const { id } = useParams();
  const [projects, setProjects] = useState([]); // Estado para proyectos
  const [selectedProject, setSelectedProject] = useState(taskData.project?.id || ""); // Estado para el proyecto seleccionado
  const [selectedPriority, setSelectedPriority] = useState(taskData.priority || ""); // Estado para la prioridad seleccionada

  useEffect(() => {
    // Cargar proyectos disponibles
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:9090/projects/getProjects"); // Cambia la URL según tu API
        const data = await response.json();
        console.log(data); // Verifica la estructura de los datos
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("Expected an array but got:", data);
          setProjects([]); // Asegúrate de que projects sea un array
        }
      } catch (error) {
        console.log("Failed to fetch projects", error);
      }
    };

    fetchProjects();
  }, []);

  const editTask = async (e) => {
    e.preventDefault();
    try {
      const updatedTaskData = { ...taskData, project: { id: selectedProject }, priority: selectedPriority };
      const response = await fetch(
        `http://localhost:9090/tasks/editTask/${id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(updatedTaskData),
        }
      );
      if (response.ok) {
        console.log("Task edited");
        setAddSuccess("Task updated successfully."); // Mensaje de éxito
        handleClose();
      } else {
        console.log("Failed to update task");
      }
    } catch (error) {
      console.log("Failed to update task", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Modal show={show} onHide={handleClose} size="md">
      <form onSubmit={editTask}>
        <Modal.Header closeButton>
          <h6 className="fw-bold">Edit Task</h6>
        </Modal.Header>
        <Modal.Body className="m-2">
          <Col>
            <input
              type="text"
              placeholder="Task name..."
              className="input-task"
              name="taskName"
              value={taskData.taskName}
              onChange={handleChange}
            />
            <br />
            <div className="m-1 row">
              <Col md={3} sm={6}>
                <h6 className="mt-1">Project</h6>
              </Col>
              <Col md={6} sm={6}>
                {/* Mostrar el nombre del proyecto actual */}
                <span className="form-control" style={{ border: "1px solid #ced4da", padding: "0.375rem 0.75rem" }}>
                  {taskData.project?.projectName || "No project selected"}
                </span>
              </Col>
            </div>

            <div className="priority m-1 row">
              <Col md={3}>
                <h6 className="mt-1">Priority</h6>
              </Col>
              <Col md={9}>
                <div className="btn-group">
                  <button
                    type="button"
                    className={`btn ${selectedPriority === "High" ? "btn-danger" : ""}`}
                    onClick={() => setSelectedPriority("High")}
                  >
                    High priority
                  </button>
                  <button
                    type="button"
                    className={`btn ${selectedPriority === "Low" ? "btn-info" : ""}`}
                    onClick={() => setSelectedPriority("Low")}
                  >
                    Low priority
                  </button>
                </div>
              </Col>
            </div>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary m-1" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn"
            type="submit"
            style={{ backgroundColor: "#0b5ed7", color: "#fff" }}
          >
            Save Task
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default EditTask;