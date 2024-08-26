import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ProjectModalBase = ({ show, handleClose, title, onSubmit, children }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg" style={{ border: "1px solid white" }}>
            <Modal.Header style={{ backgroundColor: "#020817", color: "white" }} closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#020817", color: "white" }}>
                <Form onSubmit={onSubmit}>
                    {React.Children.map(children, (child) => (
                        <div style={{ marginBottom: "1rem" }}>{child}</div>
                    ))}
                    <div className="d-flex justify-content-end mt-3">
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                            style={{
                                backgroundColor: "#2C2C2C",
                                color: "white",
                                border: "1px solid white",
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            className="ms-2"
                            style={{
                                backgroundColor: "#005CC8",
                                color: "white",
                                border: "1px solid white",
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProjectModalBase;