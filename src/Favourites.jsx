import { Link } from "react-router-dom";
import "./App.css";

function FavouritesPage({
  favourites,
  projects,
  toggleFavourite,
  clearFavourites,
}) {
  const favouriteProjects = projects.filter((project) =>
    favourites.includes(project.name),
  );

  return (
    <section id="favourites">
      <h2>Blueprint Builder</h2>
      <h3>Favourite Projects</h3>
      <p>
        {favourites.length === 0
          ? "You haven't added any projects yet."
          : `You currently have ${favourites.length} favourite ${favourites.length === 1 ? "project" : "projects"}.`}
      </p>

      <nav>
        <Link to="/generator">Generator</Link>
        <Link to="/projects">Project List</Link>
        <Link to="/suggestions">Suggestions</Link>
        <Link to="/favourites">Favourites</Link>
      </nav>

      {favourites.length > 0 && (
        <div className="favourites-actions">
          <button
            type="button"
            className="clear-favourites-btn"
            onClick={() => {
              if (window.confirm("Remove all favourite projects?")) {
                clearFavourites();
              }
            }}
          >
            🗑 Remove All
          </button>
        </div>
      )}

      {favourites.length === 0 ? (
        <p>
          Head back to the generator or project list and click the star to add
          to your favourites.
        </p>
      ) : (
        <div className="favourites-container">
          {favouriteProjects.map((project) => (
            <div className="favourite-card" key={project.name}>
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

              <button
                type="button"
                className="remove-fav-btn"
                onClick={() => toggleFavourite(project.name)}
              >
                Remove Project
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FavouritesPage;
