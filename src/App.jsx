import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './HomePage';
import GeneratorPage from './GeneratorPage';
import ProjectListPage from './ProjectListPage';
import SuggestionsPage from './SuggestionsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generator" element={<GeneratorPage />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/suggestions" element={<SuggestionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;