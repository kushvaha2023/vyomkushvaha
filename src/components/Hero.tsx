import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from './ui/button';
const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Cybersecurity, AI & Coding Enthusiast — Learning and Building.';
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);
  const socialLinks = [{
    icon: Github,
    href: '#',
    label: 'GitHub'
  }, {
    icon: Linkedin,
    href: '#',
    label: 'LinkedIn'
  }, {
    icon: Mail,
    href: '#contact',
    label: 'Email'
  }];
  return <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-2">
              <p className="text-muted-foreground font-mono text-sm md:text-base">Hello, It's me</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono">Vyom Kushvaha</h1>
              <div className="flex items-center space-x-2">
                <p className="text-xl md:text-2xl">And I'm a</p>
                <span className="text-xl md:text-2xl text-neon font-semibold">Learner</span>
              </div>
            </div>

            <div className="h-24 md:h-20">
              <p className="text-base md:text-lg text-muted-foreground font-mono">
                {typedText}
                <span className="animate-blink">|</span>
              </p>
            </div>

            <p className="text-muted-foreground max-w-lg">
              I'm a curious and analytical learner passionate about cybersecurity. I value responsibility and the drive to achieve something beyond the ordinary. As I continue learning, my goal is to work in security operations — analyzing and investigating cyber threats, finding vulnerabilities, and helping organizations stay secure.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map(social => <a key={social.label} href={social.href} className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:shadow-neon" aria-label={social.label} onClick={e => {
              if (social.href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(social.href)?.scrollIntoView({
                  behavior: 'smooth'
                });
              }
            }}>
                  <social.icon size={20} />
                </a>)}
            </div>

            {/* CTA Button */}
            <div>
              <Button className="btn-neon group">
                <Download size={18} className="mr-2 group-hover:animate-bounce" />
                Download CV
              </Button>
            </div>
          </div>

          {/* Right: Pixel Art / Logo */}
          <div className="flex justify-center items-center animate-fade-in animation-delay-400">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-glow-pulse" />
              
              {/* Pixel Art Container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 border-2 border-primary/30 rounded-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="font-mono text-6xl md:text-8xl text-neon animate-glow-pulse">
                    {'</>'}
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs md:text-sm text-muted-foreground font-mono">$ whoami</div>
                    <div className="text-sm md:text-base text-primary font-mono">vyom_kushvaha</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;