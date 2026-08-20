import { Link } from 'react-router-dom';

function SuggestionsPage() {
    return (
        <section id="suggestions">
            <h2>Suggestions</h2>
            <nav>
                <Link to="/generator">Generator</Link>
                {" | "}
                <Link to="/projects">Project List</Link>
                {" | "}
                <Link to="/suggestions">Suggestions</Link>
            </nav>
            <p>Help us improve the generator by telling us what projects you've built!</p>
        </section>
    )
}
export default SuggestionsPage;