import { Github, Linkedin, Mail, Heart, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/vyom-kushvaha', label: 'GitHub', external: true },
    { icon: Instagram, href: 'https://www.instagram.com/vyom_kushvaha_?igsh=MWlmY3hiN3Z5YnE2YQ==', label: 'Instagram', external: true },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/vyom-kushvaha?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn', external: true },
    { icon: Mail, href: '#contact', label: 'Email', external: false },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-mono text-xl font-bold text-neon">{'<Portfolio>'}</h3>
            <p className="text-muted-foreground text-sm">
              Cybersecurity & AI Learner
              <br />
              Building, Learning, Growing
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector(`#${link.toLowerCase()}`)
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all hover:scale-110 cursor-pointer"
                  aria-label={social.label}
                  onClick={(e) => {
                    if (social.href.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(social.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {currentYear} Vyom Kushvaha. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center">
            Made with <Heart size={14} className="mx-1 text-primary animate-glow-pulse" fill="currentColor" /> by
            Vyom
          </p>
        </div>

        {/* Legal/Privacy Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            This site uses no cookies and collects no personal data.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
