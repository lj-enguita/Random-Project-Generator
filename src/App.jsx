import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import { projects as startingProjects } from "./projectData";
import HomePage from "./HomePage";
import GeneratorPage from "./GeneratorPage";
import ProjectListPage from "./ProjectListPage";
import SuggestionsPage from "./SuggestionsPage";

function App() {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : startingProjects;
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (newProject) => {
    console.log("Received:", newProject);

    setProjects((currentProjects) => [...currentProjects, newProject]);
  };

  const deleteProject = (projectName) => {
    console.log("Deleting:", projectName);

    setProjects((currentProjects) =>
      currentProjects.filter((project) => project.name !== projectName),
    );
  };

  return (
    <>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/generator"
              element={<GeneratorPage projects={projects} />}
            />
            <Route
              path="/projects"
              element={
                <ProjectListPage
                  projects={projects}
                  deleteProject={deleteProject}
                />
              }
            />
            <Route
              path="/suggestions"
              element={
                <SuggestionsPage addProject={addProject} projects={projects} />
              }
            />
          </Routes>
        </Router>
      </main>
      <footer>
        <p>&copy; 2026 Blueprint Builder. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
