import { Link } from 'react-router-dom';

function ProjectListPage() {
    return (
        <section id="project-list">
            <h2>Project List</h2>
            <nav>
                <Link to="/generator">Generator</Link>
                {" | "}
                <Link to="/projects">Project List</Link>
                {" | "}
                <Link to="/suggestions">Suggestions</Link>
            </nav>
            <p>Here are some of the projects you can build with the ideas generated from the generator.</p>
        </section>
    )
}
export default ProjectListPage;