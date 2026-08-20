import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const motivations = [
    "Learn new languages",
    "Solve problems",
    "Create something new",
    "Build your portfolio",
    "Every bug fixed is a step forward",
    "Small projects become big opportunities",
    "Your next project or your best project, only one way to find out..."
];

function HomePage() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % motivations.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <section id="main">
                <h1>Blueprint Builder</h1>
                <p>You just need an idea worth building...</p>
                <Link to="/generator">
                    <button id="get-started">Get Started</button>
                </Link>
            </section>

            <section id="inspiration">
                <h2>Why Build?</h2>
                <p>{motivations[index]}</p>
            </section>
        </>
    );
}

export default HomePage;