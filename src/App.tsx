import './App.css';
import { Sidebar } from './components/sidebar';
import { Projects } from './pages/projects';

function App() {
  return (
    <div className="wrapper">
      <Sidebar />
      <Projects />
    </div>
  );
}

export default App;
