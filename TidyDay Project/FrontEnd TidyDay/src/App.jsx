// src/App.js
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./Components/LandingPage";
import Home from "./Components/Home";
import Projects from "./Components/Projects";
import Tasks from "./Components/Tasks";
import Calendar from "./Components/Calendar";
import ViewProject from "./Components/ViewProject";
import ViewTask from "./Components/ViewTask";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importar estilos de Toastify

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/pma" element={<LandingPage />} />
            <Route path="/pma/login" element={<Login />} />
            <Route path="/pma/signup" element={<Signup />} />
            <Route path="/pma/home" element={<Home />} />
            <Route path="/pma/projects/:userId" element={<Projects />} />
            <Route path="/pma/tasks" element={<Tasks />} />
            <Route path="/pma/calendar" element={<Calendar />} />
            <Route path="/pma/viewProject/:id" element={<ViewProject />} />
            <Route path="/pma/viewTask/:id" element={<ViewTask />} />
          </Routes>
          <ToastContainer 
              position="top-right" 
              autoClose={3000} 
              hideProgressBar={false} 
              closeOnClick 
              pauseOnHover 
              draggable 
              pauseOnFocusLoss 
              theme="dark" 
          />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
