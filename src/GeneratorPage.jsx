import { Link } from "react-router-dom";

function GeneratorPage() {
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
                <p> Looking for your next build? Use the generator to create unique ideas, then you bring it to life!</p>
            </section>

            <section id="generator">
                <h3>Project Generator</h3>
                <p>Click the button to see our latest project ideas:</p>
                <button id="generate-button">New Project</button>
                <div id="idea-display"></div>
            </section>


        </>
    );
}

export default GeneratorPage;
``