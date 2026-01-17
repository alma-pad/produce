import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SeasonProvider } from './contexts/SeasonContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllItems from './pages/AllItems';
import ProduceDetails from './pages/ProduceDetails';
import About from './pages/About';
import Mission from './pages/Mission';
import './styles/App.css';

function App() {
  return (
    <SeasonProvider>
      <Router>
        <div className="app">
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/all-items" element={<AllItems />} />
              <Route path="/produce/:id" element={<ProduceDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/mission" element={<Mission />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </SeasonProvider>
  );
}

export default App;

