import { Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

function SuggestionsPage({ addProject }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('Easy');
    const [technologies, setTechnologies] = useState('');
    const [submitted, setSubmitted] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newProject = {
            name: name,
            description: description,
            difficulty: difficulty,
            technologies: technologies
        };
        addProject(newProject);
        setName('');
        setDescription('');
        setDifficulty('Easy');
        setTechnologies('');
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