import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage.jsx/HomePage';
import APOD from './Components/APOD/APOD';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apod" element={<APOD />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
