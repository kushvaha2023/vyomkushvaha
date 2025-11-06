import { Progress } from './ui/progress';
interface Skill {
  name: string;
  level: 'learning' | 'familiar' | 'intermediate' | 'advanced';
  percentage: number;
}
interface SkillCategory {
  title: string;
  skills: Skill[];
}
const Skills = () => {
  const skillCategories: SkillCategory[] = [{
    title: 'Programming Languages',
    skills: [{
      name: 'Python',
      level: 'intermediate',
      percentage: 75
    }, {
      name: 'C',
      level: 'intermediate',
      percentage: 70
    }, {
      name: 'Bash/Shell Scripting',
      level: 'familiar',
      percentage: 60
    }]
  }, {
    title: 'Cybersecurity',
    skills: [{
      name: 'Network Security',
      level: 'intermediate',
      percentage: 75
    }, {
      name: 'Ethical Hacking',
      level: 'familiar',
      percentage: 65
    }, {
      name: 'Vulnerability Assessment',
      level: 'intermediate',
      percentage: 70
    }, {
      name: 'Security Analysis',
      level: 'familiar',
      percentage: 60
    }]
  }, {
    title: 'Tools & Technologies',
    skills: [{
      name: 'Kali Linux',
      level: 'intermediate',
      percentage: 75
    }, {
      name: 'Wireshark',
      level: 'familiar',
      percentage: 65
    }, {
      name: 'Nmap',
      level: 'intermediate',
      percentage: 70
    }, {
      name: 'Git/GitHub',
      level: 'intermediate',
      percentage: 75
    }]
  }];
  const getLevelColor = (level: string) => {
    // Light mode: respective colors, Dark mode: green
    switch (level) {
      case 'learning':
        return 'text-[#3b82f6] dark:text-[#22c55e]';
      // Blue in light, Green in dark
      case 'familiar':
        return 'text-[#eab308] dark:text-[#22c55e]';
      // Yellow in light, Green in dark
      case 'intermediate':
        return 'text-[#22c55e] dark:text-[#22c55e]';
      // Green in both
      case 'advanced':
        return 'text-[#a855f7] dark:text-[#22c55e]';
      // Purple in light, Green in dark
      default:
        return 'text-foreground';
    }
  };
  const getLevelText = (level: string) => {
    switch (level) {
      case 'learning':
        return 'Learning';
      case 'familiar':
        return 'Familiar';
      case 'intermediate':
        return 'Intermediate';
      case 'advanced':
        return 'Advanced';
      default:
        return '';
    }
  };
  return <section id="skills" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-neon">Skills</span>
          </h2>
          <p className="text-sm max-w-2xl mx-auto px-4 leading-relaxed text-neutral-950 text-center sm:text-lg">
            A collection of technologies and tools I'm learning and working with. Constantly expanding my knowledge
            in cybersecurity and software development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {skillCategories.map((category, categoryIndex) => <div key={category.title} className="card-glow bg-card/50 backdrop-blur-sm" style={{
          animationDelay: `${categoryIndex * 100}ms`
        }}>
              <h3 className="text-lg sm:text-xl font-bold mb-6 text-foreground border-b border-border pb-3">
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => <div key={skill.name} className="group" style={{
              animationDelay: `${categoryIndex * 100 + skillIndex * 50}ms`
            }}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground text-sm">
                        {skill.name}
                      </h4>
                      <span className={`text-xs font-mono px-2.5 py-1 rounded-full bg-muted/50 transition-colors ${getLevelColor(skill.level)}`}>
                        {getLevelText(skill.level)}
                      </span>
                    </div>
                    <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-muted/30">
                      <div className="h-full transition-all duration-700 ease-out bg-[#3b82f6] dark:bg-[#22c55e] group-hover:opacity-90 animate-fade-in" style={{
                  width: `${skill.percentage}%`,
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                  transitionDelay: `${skillIndex * 100}ms`
                }} />
                    </div>
                  </div>)}
              </div>
            </div>)}
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm animate-fade-in">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-[#3b82f6]" />
            <span className="text-muted-foreground">Learning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-[#eab308]" />
            <span className="text-muted-foreground">Familiar</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-[#22c55e]" />
            <span className="text-muted-foreground">Intermediate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-[#a855f7]" />
            <span className="text-muted-foreground">Advanced</span>
          </div>
        </div>
      </div>
    </section>;
};
export default Skills;