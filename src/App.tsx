import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Problem from './components/Problem';
import SystemComponents from './components/SystemComponents';
import ResultsDashboard from './components/ResultsDashboard';
import ChartGallery from './components/ChartGallery';
import LiveSimulation from './components/LiveSimulation';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen" style={{ background: '#0a192f' }}>
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <SystemComponents />
        <ResultsDashboard />
        <ChartGallery />
        <LiveSimulation />
      </main>
      <Footer />
    </div>
  );
}

export default App;
