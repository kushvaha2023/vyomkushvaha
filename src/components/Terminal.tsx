import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Command {
  input: string;
  output: string[];
}

const Terminal = () => {
  const { ref: terminalSectionRef, isVisible } = useScrollAnimation();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, string[]> = {
    help: [
      'Available commands:',
      '  whoami    - Display user information',
      '  skills    - Show technical skills',
      '  projects  - List recent projects',
      '  contact   - Get contact information',
      '  clear     - Clear terminal',
      '  github    - Open GitHub profile',
    ],
    whoami: [
      'Vyom Kushvaha',
      'Role: Cybersecurity & AI Learner',
      'Status: Building and Learning',
      'Location: India',
      'Passion: Ethical Hacking, AI, and Software Development',
    ],
    skills: [
      'Technical Skills:',
      '├── Cybersecurity Basics ████████░░ 80%',
      '├── Networking          ███████░░░ 70%',
      '├── Python              ████████░░ 80%',
      '├── JavaScript          ███████░░░ 70%',
      '├── C++                 ██████░░░░ 60%',
      '├── HTML/CSS            █████████░ 90%',
      '├── AI/ML Basics        ██████░░░░ 60%',
      '├── Kali Linux          ███████░░░ 70%',
      '└── Git/GitHub          ████████░░ 80%',
    ],
    projects: [
      'Recent Projects:',
      '',
      '1. Password Strength Checker',
      '   Tech: Python',
      '   Desc: Tool to analyze and rate password security',
      '',
      '2. Portfolio Website',
      '   Tech: HTML, CSS, JavaScript',
      '   Desc: Personal portfolio with hacker aesthetic',
      '',
      '3. Basic AI Chatbot',
      '   Tech: Python, NLP',
      '   Desc: Simple conversational AI demo',
    ],
    contact: [
      'Contact Information:',
      'Email: vyom@example.com',
      'GitHub: github.com/vyomkushvaha',
      'LinkedIn: linkedin.com/in/vyomkushvaha',
      '',
      'Type "github" to open GitHub profile',
    ],
    github: [
      'Opening GitHub profile...',
      'Visit: github.com/vyomkushvaha',
    ],
    clear: [],
  };

  useEffect(() => {
    // Show welcome message on mount
    setHistory([
      {
        input: '',
        output: [
          'Welcome to Vyom\'s Terminal',
          'Type "help" to see available commands',
          '─────────────────────────────────────',
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim().toLowerCase();

    if (trimmedInput === '') return;

    if (trimmedInput === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const output = commands[trimmedInput] || [`Command not found: ${trimmedInput}`, 'Type "help" for available commands'];

    setHistory((prev) => [...prev, { input: trimmedInput, output }]);
    setInput('');
    setCommandIndex(-1);

    // Handle external actions and scrolling
    setTimeout(() => {
      if (trimmedInput === 'github') {
        window.open('https://github.com', '_blank');
      } else if (trimmedInput === 'whoami') {
        scrollToSection('hero');
      } else if (trimmedInput === 'skills') {
        scrollToSection('skills');
      } else if (trimmedInput === 'projects') {
        scrollToSection('projects');
      } else if (trimmedInput === 'contact') {
        scrollToSection('contact');
      }
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && commandIndex < history.length - 1) {
        const newIndex = commandIndex + 1;
        setCommandIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].input);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex > 0) {
        const newIndex = commandIndex - 1;
        setCommandIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].input);
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <section id="terminal" className="py-20 px-4" ref={terminalSectionRef}>
      <div className="container mx-auto max-w-4xl w-full flex flex-col">
        <div className={`text-center mb-8 transition-all duration-1000 w-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Interactive <span className="text-neon">Terminal</span>
          </h2>
          <p className="content-text">Try commands like: whoami, skills, projects, help</p>
        </div>

        <div
          ref={terminalRef}
          className={`terminal min-h-[400px] max-h-[500px] overflow-y-auto overflow-x-hidden transition-all duration-1000 delay-200 w-full max-w-full mx-auto ${isVisible ? 'opacity-100 translate-y-0 dark:shadow-[0_0_30px_rgba(0,255,0,0.3)]' : 'opacity-0 translate-y-10'}`}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((cmd, index) => (
            <div key={index} className="mb-4">
              {cmd.input && (
                <div className="flex items-center space-x-2">
                  <span className="terminal-prompt">vyom@portfolio:~$</span>
                  <span className="text-foreground">{cmd.input}</span>
                </div>
              )}
              <div className="mt-2 space-y-1">
                {cmd.output.map((line, lineIndex) => (
                  <div key={lineIndex} className="terminal-comment pl-4">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <span className="terminal-prompt">vyom@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-foreground font-mono"
              autoFocus
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Terminal;
