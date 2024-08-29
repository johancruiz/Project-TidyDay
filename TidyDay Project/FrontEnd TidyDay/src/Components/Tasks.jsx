import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useNavigate } from "react-router";
import AddTask from "./AddTask";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MyCalendar.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const getTasks = async () => {
    if (userId) {
      try {
        const response = await fetch(
          `http://localhost:9090/tasks/getTasksByUser?userId=${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setTasks(result);
        } else {
          toast.error("Failed to fetch tasks");
        }
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (!showModal) {
      getTasks();
    }
  }, [showModal]);

  const viewTask = (id) => navigate(`/pma/viewTask/${id}`);

  const updateTaskStatus = async (task, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:9090/tasks/updateTask/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...task, status: newStatus }),
        }
      );
      if (response.ok) {


        
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === task.id ? { ...t, status: newStatus } : t
          )
        );
        toast.success("Task status updated");
      } else {
        toast.error("Failed to update task status");
      }
    } catch (error) {
      toast.error("Error updating task status");
    }
  };

  const checkTask = (task) => {
    const newStatus = task.status === "completed" ? "to-do" : "completed";
    updateTaskStatus(task, newStatus);
  };

  const changePriority = async (task, newPriority) => {
    try {
      const response = await fetch(
        `http://localhost:9090/tasks/updateTask/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...task, priority: newPriority }),
        }
      );
      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === task.id ? { ...t, priority: newPriority } : t
          )
        );
        toast.success("Task priority updated");
      } else {
        toast.error("Failed to update task priority");
      }
    } catch (error) {
      toast.error("Error updating task priority");
    }
  };

  const highPriority = (task) => changePriority(task, "high");
  const lowPriority = (task) => changePriority(task, "low");

  const handleDeleteTask = async (task) => {
    try {
      const response = await fetch(
        `http://localhost:9090/tasks/deleteTask/${task.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
        toast.success("Task deleted successfully");
      } else {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  const tasksTodo = tasks.filter((task) => task.status === "to-do");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <>
  <Sidebar />
  <div className="main-content" id="color_fondo">
    <TopBar />
    <div className="container tasks-container">
      <div className="tasks-top">
        <h5 className="fw-bold p-1">
          To do{" "}
          <span style={{ fontSize: "15px", fontWeight: "500" }}>
            ({tasksTodo.length})
          </span>
        </h5>
        <button className="btn add-task-btn mb-1" onClick={handleShow}>
          Add task
        </button>
      </div>
      <div className="todo-list">
        {tasksTodo.length > 0 ? (
          tasksTodo.map((task) => (
            <div className="todo-item p-3 mb-1" key={task.id}>
              <div className="row">
                <div className="col-8">
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => checkTask(task)}
                  />
                  <span
                    className="todo-title p-2"
                    onClick={() => viewTask(task.id)}
                  >
                    {task.taskName}
                  </span>
                </div>
                <div className="col-4 star-task">
                  <span>
                    <svg
                      onClick={() => handleDeleteTask(task)}
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1.25em"
                      width="1.25em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path>
                    </svg>
                    {task.priority === "low" ? (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1.25em"
                        width="1.25em"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => highPriority(task)}
                      >
                        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                      </svg>
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="#16b9c3"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1.25em"
                        width="1.25em"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => lowPriority(task)}
                      >
                        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                      </svg>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>

      <div className="tasks-top">
        <h5 className="fw-bold p-1">
          Completed tasks{" "}
          <span style={{ fontSize: "15px", fontWeight: "500" }}>
            ({completedTasks.length})
          </span>
        </h5>
      </div>
      <div className="todo-list">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <div className="todo-item p-3 mb-1" key={task.id}>
              <div className="row">
                <div className="col-8">
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => checkTask(task)}
                  />
                  <span
                    className="todo-title p-2"
                    onClick={() => viewTask(task.id)}
                  >
                    {task.taskName}
                  </span>
                </div>
                <div className="col-4 star-task">
                  <span>
                    <svg
                      onClick={() => handleDeleteTask(task)}
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1.25em"
                      width="1.25em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path>
                    </svg>
                    {task.priority === "low" ? (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1.25em"
                        width="1.25em"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => highPriority(task)}
                      >
                        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                      </svg>
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="#16b9c3"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1.25em"
                        width="1.25em"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => lowPriority(task)}
                      >
                        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                      </svg>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No completed tasks available</p>
        )}
      </div>
    </div>
    <AddTask show={showModal} handleClose={handleClose} />
    <ToastContainer />
  </div>
</>

  );
}

export default Tasks;
