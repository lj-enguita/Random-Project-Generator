import { Link } from 'react-router-dom';
import { projects } from './projectData';
import './App.css';

function ProjectListPage() {
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

                <div id="project-list-container">
                    {projects.map((project) => (
                        <div className="project-card" key={project.name}>
                            <h3>{project.name}</h3>
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