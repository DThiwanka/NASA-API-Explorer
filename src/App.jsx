import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage.jsx/HomePage';
import APOD from './Components/APOD/APOD';
import NeoFeed from './Components/NeoFeed/NeoFeed';
import LaunchLibrary from './Components/LaunchLibrary/LaunchLibrary';
import NoticeBanner from './Components/NoticeBanner/NoticeBanner';
import StarBackground from './Components/HomePage.jsx/StarBackground';

function App() {
  return (
    <Router>
      <NoticeBanner />
      <StarBackground />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apod" element={<APOD />} />
        <Route path="/neofeed" element={<NeoFeed />} />
        <Route path="/launch-library" element={<LaunchLibrary />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
