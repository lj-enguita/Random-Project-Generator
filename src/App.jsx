import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import { projects as startingProjects } from "./projectData";
import HomePage from "./HomePage";
import GeneratorPage from "./GeneratorPage";
import ProjectListPage from "./ProjectListPage";
import SuggestionsPage from "./SuggestionsPage";
import FavouritesPage from "./Favourites";

function App() {
  const [projects, setProjects] = useState(() => {
    // Restore user-added projects after the browser reloads.
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : startingProjects;
  });

  useEffect(() => {
    // Keep new and deleted projects available for the next visit.
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (newProject) => {
    console.info("Project suggestion accepted:", newProject.name);

    setProjects((currentProjects) => [...currentProjects, newProject]);
  };

  const deleteProject = (projectName) => {
    console.info("User deleted project:", projectName);

    setProjects((currentProjects) =>
      currentProjects.filter((project) => project.name !== projectName),
    );
  };

  const [favourites, setFavourites] = useState(() => {
    // Restore saved favorite names so the stars stay selected across pages.
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    // Persist only the names so the future favorites page can resolve project details.
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (projectName) => {
    setFavourites((currentFavourites) => {
      const isRemoving = currentFavourites.includes(projectName);
      console.info(
        `${isRemoving ? "Removed from" : "Added to"} favourites:`,
        projectName,
      );

      return isRemoving
        ? currentFavourites.filter((name) => name !== projectName)
        : [...currentFavourites, projectName];
    });
  };

  const clearFavourites = () => {
    console.info("User cleared all favourites.");
    setFavourites([]);
  };

  return (
    <>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/generator"
              element={
                <GeneratorPage
                  projects={projects}
                  favourites={favourites}
                  toggleFavourite={toggleFavourite}
                />
              }
            />
            <Route
              path="/projects"
              element={
                <ProjectListPage
                  projects={projects}
                  deleteProject={deleteProject}
                  favourites={favourites}
                  toggleFavourite={toggleFavourite}
                />
              }
            />
            <Route
              path="/suggestions"
              element={
                <SuggestionsPage addProject={addProject} projects={projects} />
              }
            />
            <Route
              path="/favourites"
              element={
                <FavouritesPage
                  favourites={favourites}
                  projects={projects}
                  toggleFavourite={toggleFavourite}
                  clearFavourites={clearFavourites}
                />
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
