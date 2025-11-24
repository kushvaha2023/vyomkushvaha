import { ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Project {
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const Projects = () => {
  const { ref: projectsRef, isVisible } = useScrollAnimation();
  const projects: Project[] = [
    {
      title: 'Portfolio Website',
      description:
        'Personal portfolio website with a hacker-inspired aesthetic. Features Matrix rain effect, interactive terminal, and responsive design. Built with modern web technologies.',
      tech: ['HTML', 'CSS', 'JavaScript', 'React'],
      githubUrl: 'https://github.com/vyom-kushvaha',
      liveUrl: '#',
    },
    {
      title: 'College Learning',
      description:
        'A collection of projects and assignments from my college coursework, covering various topics in computer science, programming fundamentals, and cybersecurity concepts.',
      tech: ['Python', 'C++', 'Data Structures', 'Algorithms'],
      githubUrl: 'https://github.com/vyom-kushvaha',
    },
  ];

  return (
    <section id="projects" className="py-20 px-4" ref={projectsRef}>
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-neon">Projects</span>
          </h2>
          <p className="content-text text-sm sm:text-base max-w-2xl mx-auto px-4 leading-relaxed">
            A selection of projects I've built while learning cybersecurity, AI, and software development. Each
            project represents a step in my learning journey.
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="card-glow group"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="group/btn hover:border-primary hover:bg-primary/10"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2 group-hover/btn:text-primary" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="group/btn hover:border-accent hover:bg-accent/10"
                      asChild
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2 group-hover/btn:text-accent" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="content-text text-sm md:text-base font-mono italic">
            More projects coming soon...
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
