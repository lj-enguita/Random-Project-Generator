import { Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import { projects } from './projectData';

function SuggestionsPage({ addProject, projects }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('Easy');
    const [technologies, setTechnologies] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [emoji, setEmoji] = useState("🚀");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        
        setError("");

        if(name.trim().length <5) {
            setError("Project name must be at least 5 characters.");
            return;
        }

        if(description.trim().length < 20){
            setError("Description must be at least 20 characters.");
            return;
        }

        if (technologies.trim().length < 3) {
            setError("Please enter at least one technology.")
            return;
        };

        const newProject = {
            emoji,
            name: name.trim(),
            description: description.trim(),
            difficulty: difficulty,
            technologies: technologies.trim()
        };

        const projectExists = projects.some((project) =>
        project.name.toLowerCase() ===
        name.toLowerCase()
    );
        if (projectExists){
            setError("That project already exists.")
            return;
        }
        addProject(newProject);
        setName('');
        setDescription('');
        setDifficulty('Easy');
        setTechnologies('');
        setEmoji("🚀");
        setSubmitted(true);
        
    };

    return (
        <>
            <section id="suggestions">
                <h2>Blueprint Builder</h2>
                <h3>Suggestions</h3>
                <p>Help us improve the generator by telling us what projects you've built!</p>
                <nav>
                    <Link to="/generator">Generator</Link>
                    <Link to="/projects">Project List</Link>
                    <Link to="/suggestions">Suggestions</Link>
                </nav>
                {!submitted ? (
                    <form id="suggestion-form" onSubmit={handleSubmit}>

                        <div className="emoji-preview"> {emoji}</div>
                        <div>
                            <label htmlFor="project-emoji">Icon:
                            </label>
                            <select id="project-emoji" value={emoji} onChange={(event)=>
                                setEmoji(event.target.value)
                    
                            }>
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
                        
                        {error && (
                            <p className='error-message'>{error}</p>
                        )}

                        <button type="submit">
                            Submit Suggestion
                        </button>

                    </form>
                ) : (

                    <div id="thank-you-card">

                        <h3>✅ Thank You!</h3>

                        <p>
                            Your project has been added to Blueprint Builder.
                        </p>

                        <button
                            onClick={() => setSubmitted(false)}
                        >
                            Add Another Suggestion
                        </button>

                    </div>

                )}

            </section>
        </>
    )
}
export default SuggestionsPage;