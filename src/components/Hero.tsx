import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Download, Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import logoLight from '@/assets/logo-light.png';
import logoDark from '@/assets/logo-dark.png';
const Hero = () => {
  const { theme } = useTheme();
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
    href: 'https://github.com/vyom-kushvaha',
    label: 'GitHub',
    external: true
  }, {
    icon: Instagram,
    href: 'https://www.instagram.com/vyom_kushvaha_?igsh=MWlmY3hiN3Z5YnE2YQ==',
    label: 'Instagram',
    external: true
  }, {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/vyom-kushvaha?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    label: 'LinkedIn',
    external: true
  }, {
    icon: Mail,
    href: '#contact',
    label: 'Email',
    external: false
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
              Hi, I'm Vyom Kushvaha — a curious and analytical learner passionate about cybersecurity. I value responsibility and the drive to achieve something beyond the ordinary. As I continue learning, my goal is to work in security operations — analyzing and investigating cyber threats, finding vulnerabilities, and helping organizations stay secure.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map(social => <a 
                key={social.label} 
                href={social.href} 
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
                className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:shadow-neon hover:scale-110 cursor-pointer" 
                aria-label={social.label} 
                onClick={e => {
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

          {/* Right: Logo */}
          <div className="flex justify-center items-center animate-fade-in animation-delay-400">
            <img 
              src={theme === 'light' ? logoLight : logoDark}
              alt="Vyom Kushvaha Logo"
              className="w-64 h-64 md:w-80 md:h-80 object-contain"
            />
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;