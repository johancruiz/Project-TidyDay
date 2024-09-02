import { Row, Col } from "react-bootstrap";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import CalendarWidget from "./CalendarWidget";
import CreateProjectModal from "./CreateProjectModal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Home() {
	const username = useSelector((state) => state.username);
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);
	const [projects, setProjects] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = () => setShowModal(true);
	const handleHideModal = () => setShowModal(false);


	const userId = location.state?.userId || localStorage.getItem('userId');
	const fetchTasks = async () => {
		try {
			const response = await fetch(`http://localhost:9090/tasks/getTasksByUser?userId=${userId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				const result = await response.json();
				setTasks(result);
			} else {
				console.log("Failed to fetch tasks");
			}
		} catch (error) {
			console.log("Failed to fetch tasks:", error);
		}
	};

	const user = location.state?.userId || localStorage.getItem('username');

	const fetchProjects = async () => {
		try {
			const response = await fetch(`http://localhost:9090/projects/getProjectByUser/${userId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				const projects = await response.json();
				setProjects(projects);
			} else {
				console.log("Failed to fetch projects");
			}
		} catch (error) {
			console.log("Failed to fetch projects:", error);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	useEffect(() => {
		fetchProjects();
	}, [userId]);

	const calendarPage = () => {
		navigate("/pma/calendar");
	};

	const reportsPage = () => {
		navigate("/pma/reports");
	};



	return (
		<>
			<div className="mode-user">
				<Sidebar />
				<div className="main-content" id="color_fondo">
					<TopBar />
					<div className="container">
						<div className="intro">
							<Row>
								<Col md={7} className="py-3">
									<h2 className="fw-bold py-0 mb-0" id="color_user">Hi {user}</h2>
									<small className="mb-0 mt-0" id="color_user">Welcome to your workspace</small>
								</Col>
							</Row>
						</div>
						<CreateProjectModal show={showModal} handleClose={handleHideModal} />
						<div className="first">
							<div className="row home-cards">
								<div className="col-lg-5">
									<div className="card mb-1" id="color_carts">
										<div className="card-body calendarWidget" id="border" onClick={calendarPage}>
											<h6 className="fw-bold">Your calendar</h6>
											<CalendarWidget />
										</div>
									</div>
								</div>


								<div className="col-lg-7">
									<div className="card mb-1">
										<div className="card-body" id="color_carts">
											<h6 className="fw-bold">Tasks</h6>
											{tasks.length > 0 ? (
												tasks.map((task) => (
													<ul className="mt-3 list-unstyled" key={task.id}>
														<li className="mb-0">
															{task.status === "completed" ? (
																<div>
																	<input type="checkbox" checked readOnly />
																	<s className="p-2">{task.taskName}</s>
																</div>
															) : (
																<div>
																	<p>No Tasks...</p>
																</div>
															)}
														</li>
													</ul>
												))
											) : (
												<div className="mt-5 text-center">
													<svg
														stroke="currentColor"
														fill="#163ec3"
														strokeWidth="0"
														viewBox="0 0 16 16"
														height="1.2em"
														width="1.2em"
														xmlns="http://www.w3.org/2000/svg"
														onClick={() => navigate("/pma/tasks")}
														style={{ cursor: "pointer" }}
													>
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M4 4h3v1H4v3H3V5H0V4h3V1h1v3zM1 14.5V9h1v5h12V7H8V6h6V4H8V3h6.5l.5.5v11l-.5.5h-13l-.5-.5z"
														></path>
													</svg>
													<p>(No tasks)</p>
												</div>
											)}
										</div>
									</div>
								</div>


							</div>
						</div>
						<div className="second mt-2">
							<div className="row home-cards">
								<div className="col-lg-4">
									<div className="card mb-1" id="color_carts">
										<div className="card-body">
											<h6 className="fw-bold">Project directory</h6>
											<ul className="mt-3 list-unstyled">
												{projects.length > 0 ? (
													projects.map((project) => (
														<li key={project.id} style={{ cursor: "pointer" }}>
															<svg
																stroke="currentColor"
																fill="#163ec3"
																strokeWidth="0"
																viewBox="0 0 640 512"
																height="1em"
																width="1em"
																xmlns="http://www.w3.org/2000/svg"
																className="m-1"
															>
																<path d="M384 320H256c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32zM192 32c0-17.67-14.33-32-32-32H32C14.33 0 0 14.33 0 32v128c0 17.67 14.33 32 32 32h95.72l73.16 128.04C211.98 300.98 232.4 288 256 288h.28L192 175.51V128h224V64H192V32zM608 0H480c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32z"></path>
															</svg>{" "}
															{project.projectName}
															<hr />
														</li>
													))
												) : (
													<div className="text-center mt-5">
														<svg
															stroke="currentColor"
															fill="#ff0854"
															strokeWidth="0"
															viewBox="0 0 16 16"
															height="1.2em"
															width="1.2em"
															xmlns="http://www.w3.org/2000/svg"
															onClick={() => navigate(`/pma/projects/${userId}`)}
															style={{ cursor: "pointer" }}
														>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M4 4h3v1H4v3H3V5H0V4h3V1h1v3zM1 14.5V9h1v5h12V7H8V6h6V4H8V3h6.5l.5.5v11l-.5.5h-13l-.5-.5z"
															></path>
														</svg>
														<p>(No projects)</p>
													</div>
												)}
											</ul>
										</div>
									</div>
								</div>
								<div className="col-lg-4" id="color_carts">
									<div className="card mb-1" id="color_carts">
										<div className="card-body">
											<h6 className="fw-bold">Total projects</h6>
											<div className="py-4 mt-4 text-center">
												<h3>
													{projects.length}{" "}
													<span>
														Total
														<br />
														Projects
													</span>
												</h3>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>

	);
}

export default Home;
