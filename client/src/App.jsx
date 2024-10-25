import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Main from './Components/Main'; // Import Main component
//import './Components/style.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} /> {/* Route for Main component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
