import { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";

import { toast } from "react-toastify";


import ProjectModalBase from "./ProjectModalBase";

function EditProjectModal({ show, handleClose, projectData, setProjectData }) {
    const { id } = useParams();

    const navigate = useNavigate();
 


    // Estados locales para manejar los campos del formulario
    const [localData, setLocalData] = useState({
        projectName: projectData.projectName || "",
        addedDate: projectData.addedDate || "",
        dueDate: projectData.dueDate || "",
        status: projectData.status || "",
        progress: projectData.progress || 0,
        description: projectData.description || ""
    });

    useEffect(() => {
        if (show) {
            setLocalData({
                projectName: projectData.projectName || "",
                addedDate: projectData.addedDate || "",
                dueDate: projectData.dueDate || "",
                status: projectData.status || "",
                progress: projectData.progress || 0,
                description: projectData.description || ""
            });
        }
    }, [show, projectData]); // Actualiza los valores locales cuando se abre el modal o cambia projectData

    useEffect(() => {
        if (localData.status === "Completed") {
            setLocalData(prevData => ({ ...prevData, progress: 100 }));
        }
    }, [localData.status]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalData((prevData) => ({
            ...prevData,
            [name]: name === "progress" ? Math.min(Math.max(Number(value), 0), 100) : value
        }));
    };

    const updateProject = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9090/projects/editProject/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(localData), // Enviar los datos locales actualizados
            });
            if (response.ok) {
                const updatedProject = await response.json();
                setProjectData(updatedProject);
                toast.success("Proyecto actualizado con éxito!");
                handleClose();
                navigate(`/pma/projects/${id}`);
            } else {
                throw new Error("Failed to update project");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar el proyecto");
        }
    };

    return (

        <>
            <div className="mode-user">
                <ProjectModalBase show={show} handleClose={handleClose} title="Edit Project" onSubmit={updateProject}>
                    <Form.Group controlId="formProjectName">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="projectName"
                            value={localData.projectName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formAddedDate">
                            <Form.Label>Added Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="addedDate"
                                value={localData.addedDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formDueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="dueDate"
                                value={localData.dueDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group controlId="formStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={localData.status}
                            onChange={handleChange}
                        >
                            <option value="Not started">Not started</option>
                            <option value="In-progress">In-progress</option>
                            <option value="Completed">Completed</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formProgress">
                        <Form.Label>Progress (%)</Form.Label>
                        <Form.Control
                            type="number"
                            name="progress"
                            value={localData.progress}
                            onChange={handleChange}
                            min="0"
                            max="100"
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={localData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </ProjectModalBase>
            </div>
      


        <ProjectModalBase show={show} handleClose={handleClose} title="Edit Project" onSubmit={updateProject}>
            <Form.Group controlId="formProjectName">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                    type="text"
                    name="projectName"
                    value={localData.projectName}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formAddedDate">
                    <Form.Label>Added Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="addedDate"
                        value={localData.addedDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formDueDate">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="dueDate"
                        value={localData.dueDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
            </Row>
            <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                    as="select"
                    name="status"
                    value={localData.status}
                    onChange={handleChange}
                >
                    <option value="Not started">Not started</option>
                    <option value="In-progress">In-progress</option>
                    <option value="Completed">Completed</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formProgress">
                <Form.Label>Progress (%)</Form.Label>
                <Form.Control
                    type="number"
                    name="progress"
                    value={localData.progress}
                    onChange={handleChange}
                    min="0"
                    max="100"
                />
            </Form.Group>
            <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={localData.description}
                    onChange={handleChange}
                />
            </Form.Group>
        </ProjectModalBase>
        </>

    );
}


export default EditProjectModal;
