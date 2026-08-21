import { Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import FavouriteButton from "./FavouriteButton";

function GeneratorPage({ projects, favourites, toggleFavourite }) {
  const [project, setProject] = useState(null);
  const [animation, setAnimation] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomProject = () => {
    return projects[Math.floor(Math.random() * projects.length)];
  };

  const showProject = () => {
    if (isAnimating) {
      console.info("Generator click ignored: animation is still running.");
      return;
    }

    const selectedProject = getRandomProject();
    console.info("Generator selected project:", {
      name: selectedProject.name,
      difficulty: selectedProject.difficulty,
    });
    setIsAnimating(true);

    // The first result uses a spin; later results fade out and back in.
    if (!project) {
      setProject(selectedProject);
      setAnimation("spin-in");

      setTimeout(() => {
        setAnimation("");
        setIsAnimating(false);
      }, 700);

      return;
    }

    // Current project fades out
    setAnimation("fade-out");

    setTimeout(() => {
      setProject(selectedProject);
      setAnimation("fade-in");

      setTimeout(() => {
        setAnimation("");
        setIsAnimating(false);
      }, 500);
    }, 400);
  };

  return (
    <>
      <section id="generator-title">
        <h2>Blueprint Builder</h2>

        <p>
          Looking for your next build? Use the generator to create unique ideas,
          then bring them to life!
        </p>

        <nav>
          <Link to="/generator">Generator</Link>
          <Link to="/projects">Project List</Link>
          <Link to="/suggestions">Suggestions</Link>
          <Link to="/favourites">Favourites</Link>
        </nav>

        {!project && (
          <>
            <h3>Project Generator</h3>

            <p>Click the button to see our latest project ideas:</p>
          </>
        )}
      </section>

      <section id="generator">
        <button
          id="generate-button"
          onClick={showProject}
          disabled={isAnimating}
        >
          {project ? "Generate" : "New Project"}
        </button>

        {project && (
          <div id="idea-display" className={animation}>
            <FavouriteButton
              isFavourite={favourites.includes(project.name)}
              onToggle={() => toggleFavourite(project.name)}
              projectName={project.name}
            />

            <div id="project-logo">{project.emoji}</div>

            <h4>{project.name}</h4>

            <p>{project.description}</p>

            <p>
              <strong>Difficulty:</strong> {project.difficulty}
            </p>

            <p>
              <strong>Technologies:</strong> {project.technologies}
            </p>
          </div>
        )}
      </section>
    </>
  );
}

export default GeneratorPage;
