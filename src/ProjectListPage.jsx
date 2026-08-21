import { Link } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import FavouriteButton from "./FavouriteButton";

function ProjectListPage({
  projects,
  deleteProject,
  favourites,
  toggleFavourite,
}) {
  const [filter, seeFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.difficulty === filter);

  console.log(projects);

  return (
    <>
      <section id="project-list">
        <h2>Blueprint Builder</h2>
        <h3>Project List</h3>
        <p>
          Here are some of the projects you can build with the ideas generated
          from the generator.
        </p>
        <nav>
          <Link to="/generator">Generator</Link>
          <Link to="/projects">Project List</Link>
          <Link to="/suggestions">Suggestions</Link>
        </nav>
        <div className="filter-container">
          <label htmlFor="difficulty-filter">Filter by Difficulty:</label>
          <select
            id="difficulty-filter"
            value={filter}
            onChange={(event) => seeFilter(event.target.value)}
          >
            <option value="All">All Projects</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div id="project-list-container">
          {filteredProjects.map((project) => (
            <div className="project-card" key={project.name}>
              <FavouriteButton
                isFavourite={favourites.includes(project.name)}
                onToggle={() => toggleFavourite(project.name)}
                projectName={project.name}
              />

              <h3 id="project-list-title">
                <span className="project-icon">{project.emoji}</span>
                {project.name}
              </h3>
              <p>{project.description}</p>
              <p>
                <strong>Difficulty:</strong> {project.difficulty}
              </p>
              <p>
                <strong>Technologies:</strong> {project.technologies}
              </p>

              {project.userAdded && (
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => {
                    console.log("Clicked:", project.name);
                    deleteProject(project.name);
                  }}
                >
                  🗑 Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default ProjectListPage;
