import { useState, useEffect, useRef } from 'react';
interface Command {
  input: string;
  output: string[];
}
const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const commands: Record<string, string[]> = {
    help: ['Available commands:', '  whoami    - Display user information', '  skills    - Show technical skills', '  projects  - List recent projects', '  contact   - Get contact information', '  clear     - Clear terminal', '  github    - Open GitHub profile'],
    whoami: ['Vyom Kushvaha', 'Role: Cybersecurity & AI Learner', 'Status: Building and Learning', 'Location: India', 'Passion: Ethical Hacking, AI, and Software Development'],
    skills: ['Technical Skills:', '├── Cybersecurity Basics ████████░░ 80%', '├── Networking          ███████░░░ 70%', '├── Python              ████████░░ 80%', '├── JavaScript          ███████░░░ 70%', '├── C++                 ██████░░░░ 60%', '├── HTML/CSS            █████████░ 90%', '├── AI/ML Basics        ██████░░░░ 60%', '├── Kali Linux          ███████░░░ 70%', '└── Git/GitHub          ████████░░ 80%'],
    projects: ['Recent Projects:', '', '1. Password Strength Checker', '   Tech: Python', '   Desc: Tool to analyze and rate password security', '', '2. Portfolio Website', '   Tech: HTML, CSS, JavaScript', '   Desc: Personal portfolio with hacker aesthetic', '', '3. Basic AI Chatbot', '   Tech: Python, NLP', '   Desc: Simple conversational AI demo'],
    contact: ['Contact Information:', 'Email: vyom@example.com', 'GitHub: github.com/vyomkushvaha', 'LinkedIn: linkedin.com/in/vyomkushvaha', '', 'Type "github" to open GitHub profile'],
    github: ['Opening GitHub profile...', 'Visit: github.com/vyomkushvaha'],
    clear: []
  };
  useEffect(() => {
    // Show welcome message on mount
    setHistory([{
      input: '',
      output: ['Welcome to Vyom\'s Terminal', 'Type "help" to see available commands', '─────────────────────────────────────']
    }]);
  }, []);
  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);
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
    setHistory(prev => [...prev, {
      input: trimmedInput,
      output
    }]);
    setInput('');
    setCommandIndex(-1);

    // Handle external actions
    if (trimmedInput === 'github') {
      window.open('https://github.com', '_blank');
    }
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
  return <section id="terminal" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Interactive <span className="text-neon text-sky-600">Terminal</span>
          </h2>
          <p className="text-stone-900">Try commands like: whoami, skills, projects, help</p>
        </div>

        <div ref={terminalRef} className="terminal min-h-[400px] max-h-[500px] overflow-y-auto animate-fade-in-up" onClick={() => inputRef.current?.focus()}>
          {history.map((cmd, index) => <div key={index} className="mb-4">
              {cmd.input && <div className="flex items-center space-x-2">
                  <span className="terminal-prompt">vyom@portfolio:~$</span>
                  <span className="text-foreground">{cmd.input}</span>
                </div>}
              <div className="mt-2 space-y-1">
                {cmd.output.map((line, lineIndex) => <div key={lineIndex} className="terminal-comment pl-4">
                    {line}
                  </div>)}
              </div>
            </div>)}

          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <span className="terminal-prompt">vyom@portfolio:~$</span>
            <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} className="flex-1 bg-transparent outline-none text-foreground font-mono" autoFocus spellCheck={false} />
          </form>
        </div>
      </div>
    </section>;
};
export default Terminal;