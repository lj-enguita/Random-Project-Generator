import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import { projects as startingProjects } from './projectData';
import HomePage from './HomePage';
import GeneratorPage from './GeneratorPage';
import ProjectListPage from './ProjectListPage';
import SuggestionsPage from './SuggestionsPage';

function App() {
  const [projects, setProjects] = useState(startingProjects);

  const addProject = (newProject) => {
    setProjects((currentProjects) => [
      ...currentProjects,
      newProject
    ]);
  };
  return (
    <>
    <main>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generator" element={<GeneratorPage projects={projects} />} />
        <Route path="/projects" element={<ProjectListPage projects={projects} />} />
        <Route path="/suggestions" element={<SuggestionsPage addProject={addProject} projects={projects} />} />
      </Routes>
    </Router>
    </main>
    <footer>
      <p>&copy; 2026 Blueprint Builder. All rights reserved.</p>
    </footer>
    </>
  );
}

export default App;