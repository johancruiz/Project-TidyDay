import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Modal, Button, Card, Badge } from "react-bootstrap";
import EditProjectModal from "./EditProjectModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewProject = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    projectName: "",
    summary: "",
    description: "",
    status: "",
    dueDate: "",
    addedDate: "",
    notes: "",
    progress: "",
  });
  const { id } = useParams();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await fetch(`http://localhost:9090/projects/getProjectById/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProjectData(data);
        } else {
          toast.error("Failed to fetch project.");
        }
      } catch (error) {
        console.log("Failed to fetch project data", error);
        toast.error("Failed to fetch project data.");
      }
    };
    getProject();
  }, [id]);

  const showEditModal = () => {
    setEditModal(true);
  };

  const handleClose = () => {
    setEditModal(false);
  };

  const deleteProject = async () => {
    try {
      const response = await fetch(`http://localhost:9090/projects/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Project successfully deleted.");
        setTimeout(() => navigate(`/pma/projects/${id}`), 2000);
      } else {
        toast.error("Failed to delete project.");
      }
    } catch (error) {
      console.log("Failed to delete project", error);
      toast.error("Failed to delete project.");
    } finally {
      setDeleteModal(false);
    }
  };

  const showDeleteModal = () => {
    setDeleteModal(true);
  };

  const hideDeleteModal = () => {
    setDeleteModal(false);
  };

  if (!projectData.projectName) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mode-user">
        <Sidebar />
        <div className="main-content">
          <TopBar />
          <div className="container mt-4">
            <Card className="shadow-sm" style={{ backgroundColor: "#020817", color: "#fff" }}>
              <Card.Header className="text-light" style={{ backgroundColor: "#0b5ed7", color: "#fff" }}>
                <h4>Project Details</h4>
              </Card.Header>
              <Card.Body>
                <div className="project-details">
                  <h5 className="fw-bold mb-3">Project Name: <span>{projectData.projectName}</span></h5>
                  <hr className="my-4" />
                  <p className="mb-4"><strong>Summary:</strong> {projectData.summary}</p>
                  <hr className="my-4" />
                  <p className="mb-4"><strong>Description:</strong> {projectData.description}</p>
                  <hr className="my-4" />
                  <div className="mb-4">
                    <strong>Status:</strong> <Badge pill bg={projectData.status === "Active" ? "success" : "secondary"}>{projectData.status}</Badge>
                    <hr className="my-4" />
                  </div>
                  <div className="mb-4">
                    <strong>Progress:</strong> <Badge pill bg={projectData.progress >= 100 ? "success" : "warning"}>{projectData.progress}%</Badge>
                    <hr className="my-4" />
                  </div>
                  <div className="mb-4">
                    <strong>Notes:</strong> {projectData.notes}
                  </div>
                </div>
                <div className="mt-4">
                  <hr className="my-4" />
                  <Button variant="primary" className="me-2" onClick={showEditModal}>Edit Project</Button>
                  <Button variant="danger" onClick={showDeleteModal}>Delete Project</Button>
                </div>
              </Card.Body>
            </Card>
            <Modal style={{ backgroundColor: "#020817" }} show={deleteModal} onHide={hideDeleteModal}>
              <Modal.Header style={{ backgroundColor: "#020817", color: "#fff" }} closeButton>
                <Modal.Title style={{ backgroundColor: "#020817", color: "#fff" }}>Confirm Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: "#020817", color: "#fff" }}>Are you sure you want to delete this project?</Modal.Body>
              <Modal.Footer style={{ backgroundColor: "#020817", color: "#fff" }}>
                <Button variant="secondary" onClick={hideDeleteModal}>Cancel</Button>
                <Button style={{ backgroundColor: "#0b5ed7", color: "#fff" }} onClick={deleteProject}>Delete</Button>
              </Modal.Footer>
            </Modal>
            <EditProjectModal
              show={editModal}
              handleClose={handleClose}
              projectData={projectData}
              setProjectData={setProjectData}
            />
          </div>
          <ToastContainer />
        </div>
        <ToastContainer />
      </div>

    </>
  );
};

export default ViewProject;
