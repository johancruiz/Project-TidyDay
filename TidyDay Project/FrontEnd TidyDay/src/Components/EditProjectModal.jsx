import { Modal, Col } from "react-bootstrap"; 
import { useState } from "react";
import { useParams } from "react-router";
import "./MyCalendar.css";
import".././App.css";

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
      <form onSubmit={updateProject} >
        <Modal.Header closeButton id="color_form">
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body id="color_form">
          <input
            type="text"
            name="projectName"
            placeholder="Project name"
            className="modal-input fw-bold project-name-input m-1"
            value={projectData.projectName}
            onChange={handleChange}
            required
            style={{ fontSize: "15px",
              fontWeight: "300",
              border:"1px solid",
              color:"#fff", 
              background:"#020817"
            }}
          />
          <input
            type="text"
            name="summary"
            placeholder="Add a short summary"
            className="project-summary-input project-name-input m-1"
            value={projectData.summary}
            onChange={handleChange}
            required
            style={{ fontSize: "15px",
              fontWeight: "300",
              border:"1px solid",
              color:"#fff", 
              background:"#020817"
            }}
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
                style={{
                  height: "28px",
                  width: "160px",
                  borderRadius: "2px",
                  color: "white",
                  background:"#020817",
                  border:"1px solid"
                }}
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
                style={{
                  height: "28px",
                  width: "160px",
                  borderRadius: "2px",
                  color: "white",
                  background:"#020817",
                  border:"1px solid"
                }}
              />
            </Col>
            <Col md={3} sm={4} xs={4}>
              <select
                name="status"
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                style={{
                  height: "28px",
                  width: "160px",
                  borderRadius: "2px",
                  color: "white",
                  background:"#020817",
                  border:"1px solid",
                  fontSize:"12.5px"
                }}
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
                style={{
                  height: "28px",
                  width: "160px",
                  borderRadius: "2px",
                  color: "white",
                  background:"#020817",
                  border:"1px solid"
                }}
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
            style={{ fontSize: "15px",
              fontWeight: "300",
              border:"1px solid",
              color:"#fff" , 
              background:"#020817"
            }}
          />
          <hr />
          <textarea
            name="notes"
            rows="5"
            placeholder="Write some notes..."
            className="w-100"
            value={projectData.notes}
            onChange={handleChange}
            style={{ fontSize: "15px",
              fontWeight: "300",
              border:"1px solid",
              color:"#fff", 
              background:"#020817"
            }}
          />
            <div
              className="row"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div
                className="btn btn-secondary m-1"
                style={{ width: "fit-content",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  backgroundColor: "#2c2c2c"
                }}
                onClick={handleClose}
              >
                Cancel
              </div>
              <button
                className="btn m-1"
                style={{
                  width: "fit-content",
                    backgroundColor: "#0b2166",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                }}
                type="submit"
              >
                Add Project
              </button>
            </div>
        </Modal.Body>
        
         
      </form>
      
    </Modal>
  );
}

export default EditProjectModal;
