import { Link } from "react-router-dom";
import { projects } from "./projectData";
import { useState } from "react";

function GeneratorPage() {
    const [project, setProject] = useState(null);

    const generateProject = () => {
        const randomProject = projects[Math.floor(Math.random() * projects.length)];
        setProject(randomProject);
    };
    return (
        <>
            <section id="generator-title">
                <h2>Blueprint Builder</h2>
                <nav>
                    <Link to="/generator">Generator</Link>
                    {" | "}
                    <Link to="/projects">Project List</Link>
                    {" | "}
                    <Link to="/suggestions">Suggestions</Link>
                </nav>
                {!project && (
                    <>
                        <p> Looking for your next build? Use the generator to create unique ideas, then you bring them to life!</p>

                        <h3>Project Generator</h3>
                        <p>Click the button to see our latest project ideas:</p>
                    </>
                )}
            </section>

            <section id="generator">
                <button id="generate-button" onClick={generateProject}>{project ? "Generate" : "New Project"}</button>
                <div id="idea-display">
                    {project && (
                        <>
                            <h4>{project.name}</h4>
                            <p>{project.description}</p>
                            <p><strong>Difficulty:</strong> {project.difficulty}</p>
                            <p><strong>Technologies:</strong> {project.technologies}</p>
                        </>
                    )}
                </div>
            </section>


        </>
    );
}

export default GeneratorPage;
``