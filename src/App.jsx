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
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generator" element={<GeneratorPage projects={projects} />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/suggestions" element={<SuggestionsPage addProject={addProject} />} />
      </Routes>
    </Router>
  );
}

export default App;