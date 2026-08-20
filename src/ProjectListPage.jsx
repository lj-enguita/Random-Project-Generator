import { Link } from 'react-router-dom';
import { projects } from './projectData';
import './App.css';
import { useState } from 'react';

function ProjectListPage() {
    const [filter, seeFilter] = useState("All");

    const filteredProjects = 
        filter === "All"
            ? projects
            : projects.filter(
                (project) => project.difficulty ===
            filter);
        
    return (
        <>
            <section id="project-list">
                <h2>Blueprint Builder</h2>
                <h3>Project List</h3>
                <p>Here are some of the projects you can build with the ideas generated from the generator.</p>
                <nav>
                    <Link to="/generator">Generator</Link>
                    <Link to="/projects">Project List</Link>
                    <Link to="/suggestions">Suggestions</Link>
                </nav>
                <div className="filter-container">
                    <label htmlFor="difficulty-filter">
                        Filter by Difficulty:
                    </label>
                    <select id="difficulty-filter"
                    value={filter}
                    onChange ={(event) =>
                        seeFilter(event.target.value)
                    }
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
                            <h3 id="project-list-title">
                                <span className="project-icon">{project.emoji}</span>
                                {project.name}</h3>
                            <p>{project.description}</p>
                            <p><strong>Difficulty:</strong> {project.difficulty}</p>
                            <p><strong>Technologies:</strong> {project.technologies}</p>
                        </div>
                    ))}
                </div>
            </section>
            
        </>
    )
}
export default ProjectListPage;