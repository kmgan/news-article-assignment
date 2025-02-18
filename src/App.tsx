import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CreateArticle from "./CreateArticle";
import DisplayArticles from './DisplayArticles';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route to redirect to /display */}
        <Route path="/" element={<Navigate to="/display" />} />

        {/* Route for displaying articles */}
        <Route path="/display" element={<DisplayArticles />} />

        {/* Route for editing articles */}
        <Route path="/update/:id" element={<CreateArticle />} />
        
        {/* Route for creating new article */}
        <Route path="/create" element={<CreateArticle />} />
      </Routes>
    </Router>
  );
}

export default App;
