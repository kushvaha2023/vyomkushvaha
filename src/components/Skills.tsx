import { Shield, Brain, Code2, Network, Terminal as TerminalIcon, Database } from 'lucide-react';

interface Skill {
  name: string;
  level: 'learning' | 'intermediate' | 'familiar';
  icon: typeof Shield;
}

const Skills = () => {
  const skills: Skill[] = [
    { name: 'Cybersecurity Basics', level: 'intermediate', icon: Shield },
    { name: 'Networking', level: 'intermediate', icon: Network },
    { name: 'Ethical Hacking', level: 'learning', icon: TerminalIcon },
    { name: 'Python', level: 'intermediate', icon: Code2 },
    { name: 'JavaScript', level: 'intermediate', icon: Code2 },
    { name: 'C++', level: 'familiar', icon: Code2 },
    { name: 'AI/ML Basics', level: 'learning', icon: Brain },
    { name: 'Kali Linux', level: 'intermediate', icon: TerminalIcon },
    { name: 'Git/GitHub', level: 'intermediate', icon: Database },
    { name: 'HTML/CSS', level: 'familiar', icon: Code2 },
    { name: 'VS Code', level: 'familiar', icon: Code2 },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'familiar':
        return 'border-primary bg-primary/10';
      case 'intermediate':
        return 'border-accent bg-accent/10';
      case 'learning':
        return 'border-muted-foreground bg-muted';
      default:
        return 'border-border';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'familiar':
        return 'Familiar';
      case 'intermediate':
        return 'Intermediate';
      case 'learning':
        return 'Learning';
      default:
        return '';
    }
  };

  return (
    <section id="skills" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-neon">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of technologies and tools I'm learning and working with. Constantly expanding my knowledge
            in cybersecurity, AI, and software development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className={`card-glow group hover:scale-105 ${getLevelColor(skill.level)}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-background/50 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{skill.name}</h3>
                    <span
                      className={`text-xs font-mono px-2 py-1 rounded ${
                        skill.level === 'familiar'
                          ? 'bg-primary/20 text-primary'
                          : skill.level === 'intermediate'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-muted-foreground/20 text-muted-foreground'
                      }`}
                    >
                      {getLevelText(skill.level)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary" />
            <span className="text-muted-foreground">Familiar</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-accent border-2 border-accent" />
            <span className="text-muted-foreground">Intermediate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-muted border-2 border-muted-foreground" />
            <span className="text-muted-foreground">Learning</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
