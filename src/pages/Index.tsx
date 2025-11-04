import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Terminal from '@/components/Terminal';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen z-20">
      <Navigation />
      <main>
        <Hero />
        <Terminal />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
