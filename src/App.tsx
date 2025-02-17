import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateArticle from "./CreateArticle";

function App() {
  return (
    <Router>
      <Routes>
        {/* CreateArticle Route */}
        <Route path="/" element={<CreateArticle />} />

      </Routes>
    </Router>
  );
}

export default App;
