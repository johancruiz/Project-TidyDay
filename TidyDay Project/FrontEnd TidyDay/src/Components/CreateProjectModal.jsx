import { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectModalBase from "./ProjectModalBase";

function CreateProjectModal({ show, handleClose, setAddSuccess, userId }) {
    const navigate = useNavigate();
    const [data, setData] = useState({
        projectName: "",
        status: "",
        description: "",
        summary: "",
        addedDate: "",
        dueDate: "",

        progress: 0,
    });



    // Restablecer el formulario al abrir el modal
    useEffect(() => {
        if (show) {
            setData({
                projectName: "",
                status: "",
                description: "",
                summary: "",
                addedDate: "",
                dueDate: "",
                progress: 0,
            });
        }
    }, [show]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            console.error("User ID is undefined");
            return;
        }

        // Ajustar el progreso según el estado
        if (data.status === "Completed") {
            data.progress = 100;
        }

        try {
            const response = await fetch(
                `http://localhost:9090/projects/addProject?userId=${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const responseText = await response.text();
            if (response.ok) {
                console.log("Added project");
                handleClose();
                setAddSuccess(responseText);
                navigate(`/pma/projects/${userId}`);
            } else {
                console.error('Error in response:', responseText);
            }
        } catch (error) {
            console.log("Failed to add project", error);
        }
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;

        // Actualizar el estado del formulario
        setData((prevData) => ({ ...prevData, [name]: value }));

        // Actualizar el progreso si el estado cambia
        if (name === "status") {
            if (value === "Completed") {
                setData((prevData) => ({ ...prevData, progress: 100 }));
            } else {
                setData((prevData) => ({ ...prevData, progress: 0 })); // O establece un valor predeterminado
            }
        }
    };

    return (
        <>
            <div className="mode-user">
                <ProjectModalBase show={show} handleClose={handleClose} title="New Project" onSubmit={handleSubmit}>
                    <Form.Group controlId="formProjectName">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="projectName"
                            value={data.projectName}
                            onChange={handleOnChange}
                            required
                            placeholder="Enter project name"
                        />
                    </Form.Group>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formAddedDate">
                                <Form.Label>Added Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="addedDate"
                                    value={data.addedDate}
                                    onChange={handleOnChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formDueDate">
                                <Form.Label>Due Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dueDate"
                                    value={data.dueDate}
                                    onChange={handleOnChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={data.status}
                            onChange={handleOnChange}
                        >
                            <option value="">Select Status</option>
                            <option value="Not-started">Not started</option>
                            <option value="In-progress">In-progress</option>
                            <option value="Completed">Completed</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formProgress">
                        <Form.Label>Progress (%)</Form.Label>
                        <Form.Control
                            type="number"
                            name="progress"
                            value={data.progress}
                            onChange={handleOnChange}
                            min={0}
                            max={100}
                            required
                            placeholder="Enter progress percentage"
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            name="description"
                            value={data.description}
                            onChange={handleOnChange}
                            placeholder="Write a description..."
                        />
                    </Form.Group>
                    <Form.Group controlId="formSummary">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            name="summary"
                            value={data.summary}
                            onChange={handleOnChange}
                            placeholder="Enter project summary"
                        />
                    </Form.Group>
                </ProjectModalBase>
            </div>
        </>

    );
}

export default CreateProjectModal;
