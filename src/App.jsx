import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import AIEngineering from './components/AIEngineering';
import PortfolioAgent from './components/PortfolioAgent';
import Projects from './components/Projects';
import ArtSection from './components/Art';
import ContactSection from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-temporal-bg text-temporal-text selection:bg-temporal-accent selection:text-temporal-bg">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <AIEngineering />
        <PortfolioAgent />
        <Projects />
        <ArtSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
