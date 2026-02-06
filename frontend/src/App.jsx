import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Generator from './pages/Generator.jsx';
import MyMods from './pages/MyMods.jsx';
import Docs from './pages/Docs.jsx';

const App = () => {
  return (
    <div className="min-h-screen bg-stone-950 text-white">
      <NavBar />
      <main className="px-6 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/mods" element={<MyMods />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
