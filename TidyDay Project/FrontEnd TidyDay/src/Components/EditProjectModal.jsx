import { Modal, Col } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router";

function EditProjectModal({ show, handleClose, projectData, setProjectData }) {
  const [selectedValue, setSelectedValue] = useState(projectData.status);
  const { id } = useParams();

  const updateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:9090/projects/editProject/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...projectData,
            status: selectedValue, // Ensure status is sent
          }),
        }
      );
      if (response.ok) {
        console.log("Updated project");
        handleClose();
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error(error);
      // Optionally display error to the user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <form onSubmit={updateProject}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name="projectName"
            placeholder="Project name"
            className="modal-input fw-bold project-name-input m-1"
            value={projectData.projectName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="summary"
            placeholder="Add a short summary"
            className="project-summary-input project-name-input m-1"
            value={projectData.summary}
            onChange={handleChange}
            required
          />
          <div className="row projects-buttons mt-3">
            <Col md={3} sm={4} xs={4}>
              <input
                type="date"
                name="addedDate"
                placeholder="Starting date"
                value={projectData.addedDate}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={3} sm={4} xs={4}>
              <input
                type="date"
                name="dueDate"
                placeholder="Due date"
                value={projectData.dueDate}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={3} sm={4} xs={4}>
              <select
                name="status"
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                className="form-select"
              >
                <option value="Not started">Not started</option>
                <option value="In-progress">In-progress</option>
                <option value="Completed">Completed</option>
              </select>
            </Col>
            <Col md={3} sm={4} xs={4}>
              <input
                type="number"
                name="progress"
                placeholder="Progress %"
                value={projectData.progress || ""}
                onChange={handleChange}
              />
            </Col>
          </div>
          <hr />
          <textarea
            name="description"
            rows="5"
            placeholder="Write a description, project brief, or collect ideas..."
            className="w-100"
            value={projectData.description}
            onChange={handleChange}
          />
          <hr />
          <textarea
            name="notes"
            rows="5"
            placeholder="Write some notes..."
            className="w-100"
            value={projectData.notes}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
          <button className="btn btn-primary" type="submit">Update Project</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default EditProjectModal;
