import { Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";

const hasLetters = (value) => /[A-Za-z]/.test(value);

const hasRepeatedCharacters = (value) =>
  // Ignore spaces so repeated filler characters are still detected.
  /(.)\1{3,}/i.test(value.replace(/\s/g, ""));

const isMostlySymbols = (value) => {
  const compactValue = value.replace(/\s/g, "");
  const letterCount = (compactValue.match(/[A-Za-z]/g) || []).length;

  return compactValue.length > 0 && letterCount / compactValue.length < 0.5;
};

function SuggestionsPage({ addProject, projects }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [technologies, setTechnologies] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emoji, setEmoji] = useState("🚀");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const trimmedTechnologies = technologies.trim();

    if (trimmedName.length < 5) {
      console.warn("Suggestion rejected: project name is too short.");
      setError("Project name must be at least 5 characters.");
      return;
    }

    if (!/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(trimmedName)) {
      console.warn(
        "Suggestion rejected: project name contains invalid characters.",
      );
      setError(
        "Project name can only contain letters, spaces, hyphens, or apostrophes.",
      );
      return;
    }

    if (hasRepeatedCharacters(trimmedName)) {
      console.warn(
        "Suggestion rejected: project name contains repeated characters.",
      );
      setError(
        "Project name cannot contain four repeated characters in a row.",
      );
      return;
    }

    if (trimmedDescription.length < 20) {
      console.warn("Suggestion rejected: description is too short.");
      setError("Description must be at least 20 characters.");
      return;
    }

    if (
      !hasLetters(trimmedDescription) ||
      hasRepeatedCharacters(trimmedDescription) ||
      isMostlySymbols(trimmedDescription)
    ) {
      console.warn("Suggestion rejected: description appears invalid.");
      setError(
        "Please enter a meaningful description using words, not random characters.",
      );
      return;
    }

    if (trimmedTechnologies.length < 3) {
      console.warn("Suggestion rejected: technology entry is too short.");
      setError("Please enter at least one technology.");
      return;
    }

    if (
      !hasLetters(trimmedTechnologies) ||
      hasRepeatedCharacters(trimmedTechnologies) ||
      isMostlySymbols(trimmedTechnologies)
    ) {
      console.warn("Suggestion rejected: technology entry appears invalid.");
      setError("Please enter real technology names, not random characters.");
      return;
    }

    const newProject = {
      emoji,
      name: trimmedName,
      description: trimmedDescription,
      difficulty: difficulty,
      technologies: trimmedTechnologies,
      userAdded: true,
    };
    console.info("Suggestion details ready for duplicate check:", {
      name: newProject.name,
      difficulty: newProject.difficulty,
      technologies: newProject.technologies,
    });

    const projectExists = projects.some(
      (project) => project.name.toLowerCase() === name.toLowerCase(),
    );
    if (projectExists) {
      console.warn("Suggestion rejected: project already exists.", {
        name: trimmedName,
      });
      setError("That project already exists.");
      return;
    }
    console.info("Submitting project suggestion:", newProject.name);
    addProject(newProject);
    setName("");
    setDescription("");
    setDifficulty("Easy");
    setTechnologies("");
    setEmoji("🚀");
    setSubmitted(true);
  };

  return (
    <>
      <section id="suggestions">
        <h2>Blueprint Builder</h2>
        <h3>Suggestions</h3>
        <p>
          Help us improve the generator by telling us what projects you've
          built!
        </p>
        <nav>
          <Link to="/generator">Generator</Link>
          <Link to="/projects">Project List</Link>
          <Link to="/suggestions">Suggestions</Link>
          <Link to="/favourites">Favourites</Link>
        </nav>
        {!submitted ? (
          <form id="suggestion-form" onSubmit={handleSubmit}>
            <div className="emoji-preview"> {emoji}</div>
            <div>
              <label htmlFor="project-emoji">Icon:</label>
              <select
                id="project-emoji"
                value={emoji}
                onChange={(event) => setEmoji(event.target.value)}
              >
                <option value="🚀">🚀 Rocket</option>
                <option value="🎮">🎮 Game</option>
                <option value="🤖">🤖 Robot</option>
                <option value="📱">📱 Mobile App</option>
                <option value="💻">💻 Software</option>
                <option value="🎵">🎵 Music</option>
                <option value="🌱">🌱 Nature</option>
                <option value="📚">📚 Learning</option>
                <option value="🦖">🦖 Dinosaur</option>
                <option value="🐱">🐱 Animal</option>
                <option value="👽">👽 Sci-Fi</option>
                <option value="🎨">🎨 Creative</option>
                <option value="📷">📷 Camera</option>
                <option value="📺">📺 Television</option>
                <option value="🧑‍🤝‍🧑">🧑‍🤝‍🧑 Community</option>
              </select>
            </div>

            <div>
              <label htmlFor="project-name">Project Name:</label>
              <input
                id="project-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="project-description">Description:</label>
              <textarea
                id="project-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="project-difficulty">Difficulty:</label>
              <select
                id="project-difficulty"
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label htmlFor="project-technologies">Technologies:</label>
              <input
                id="project-technologies"
                type="text"
                value={technologies}
                onChange={(event) => setTechnologies(event.target.value)}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit">Submit Suggestion</button>
          </form>
        ) : (
          <div id="thank-you-card">
            <h3>✅ Thank You!</h3>

            <p>Your project has been added to Blueprint Builder.</p>

            <button onClick={() => setSubmitted(false)}>
              Add Another Suggestion
            </button>
          </div>
        )}
      </section>
    </>
  );
}
export default SuggestionsPage;
