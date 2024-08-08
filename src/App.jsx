import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage.jsx/HomePage';
import APOD from './Components/APOD/APOD';
import NeoFeed from './Components/NeoFeed/NeoFeed';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apod" element={<APOD />} />
        <Route path="/neofeed" element={<NeoFeed />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
