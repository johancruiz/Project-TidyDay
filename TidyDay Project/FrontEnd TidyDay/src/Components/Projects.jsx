import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Row, Col } from "react-bootstrap";
import CreateProjectModal from "./CreateProjectModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Projects.css'; // Asegúrate de tener este archivo CSS

function Projects() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [addSuccess, setAddSuccess] = useState("");

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => {
    setShowModal(false);
    getProjects(); // Actualizar lista de proyectos después de cerrar el modal
  };

  const userId = location.state?.userId || localStorage.getItem('userId');

  const getProjects = async () => {
    if (userId) {
      try {
        const response = await fetch(
          `http://localhost:9090/projects/getProjectByUser/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const projectsData = await response.json();
          setProjects(projectsData);
        } else {
          const errorText = await response.text();
          toast.error(`Failed to fetch projects: ${errorText}`);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        toast.error("Failed to fetch projects.");
      }
    }
  };

  useEffect(() => {
    getProjects();
  }, [userId]);

  const projectChunks = [];
  for (let i = 0; i < projects.length; i += 3) {
    projectChunks.push(projects.slice(i, i + 3));
  }

  const handleViewProject = (id) => {
    navigate(`/pma/viewProject/${id}`);
  };

  useEffect(() => {
    if (addSuccess) {
      toast.success(addSuccess);
      setAddSuccess("");
    }
  }, [addSuccess]);

  return (
    <>
  <div className="mode-user">
    <Sidebar />
    <div className="main-content" id="color_fondo">
      <TopBar />
      <div className="card m-3 p-4" style={{ backgroundColor: "#020817", borderRadius: "10px", border: "none", minHeight: "35rem" }}>
        <div className="row" style={{ color: "white" }}>
          <Col md={6} className="mt-2">
            <h5 className="fw-bold projects-title mt-1">All Projects</h5>
          </Col>
          <Col md={6} className="create-link mt-1 text-end">
            <button
              className="btn btn-primary"
              onClick={handleShowModal}
              style={{ backgroundColor: "#005cc8", border: "none" }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                viewBox="0 0 24 24"
                height="1.3em"
                width="1.3em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  d="M12,18 L12,6 M6,12 L18,12"
                ></path>
              </svg>
            </button>
          </Col>
        </div>
        <CreateProjectModal
          show={showModal}
          handleClose={handleHideModal}
          setAddSuccess={setAddSuccess}
          userId={userId}
        />
        {projects.length > 0 ? (
          <div className="projects-cards mt-2">
            {projectChunks.map((chunk, chunkIndex) => (
              <Row key={chunkIndex}>
                {chunk.map((project) => (
                  <Col md={4} key={project.id}>
                    <div
                      className={`project-card card mb-3`}
                      onClick={() => handleViewProject(project.id)}
                    >
                      <div className="card-body">
                        <h4 className="project-name">{project.projectName}</h4>
                        <div className="status-container">
                          <button className={`status-btn ${project.status.replace(" ", "-").toLowerCase()}`}>
                            {project.status}
                          </button>
                        </div>
                        <p className="project-summary">{project.summary}</p>
                        <div className="dates">
                          <h6>
                            Added date: <span>{project.addedDate}</span>
                          </h6>
                          <h6>
                            Due date: <span>{project.dueDate}</span>
                          </h6>
                        </div>
                        <div className="progress-container">
                          <h6 style={{ color: "white" }}>Progress: </h6>
                          <div className="progress" style={{ height: "20px" }}>
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{
                                width: `${project.progress}%`,
                                backgroundColor: project.progress === 100 ? 'green' : '#005cc8',
                                color: 'white',
                                textAlign: 'center',
                                lineHeight: '20px',
                              }}
                            >
                              {project.progress}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            ))}
          </div>
        ) : (
          <h5 style={{ textAlign: "center", marginTop: "150px", color: "GrayText", fontSize: "16px" }}>
            No projects...
          </h5>
        )}
        <ToastContainer />
      </div>
    </div>
  </div>
</>

  );
}

export default Projects;
