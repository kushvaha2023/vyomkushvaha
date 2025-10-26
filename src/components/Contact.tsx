import { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS
  emailjs.init('TP-iSknJTuHefrwdL');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Trim inputs
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    // Basic validation
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    // Length validation
    if (trimmedName.length > 100) {
      toast({
        title: 'Error',
        description: 'Name must be less than 100 characters',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    if (trimmedEmail.length > 255) {
      toast({
        title: 'Error',
        description: 'Email must be less than 255 characters',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    if (trimmedMessage.length > 1000) {
      toast({
        title: 'Error',
        description: 'Message must be less than 1000 characters',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    // Send email via EmailJS
    try {
      const templateParams = {
        from_name: trimmedName,
        from_email: trimmedEmail,
        message: trimmedMessage,
        to_email: 'vyomkushvaha@gmail.com',
      };

      await emailjs.send(
        'service_ouu40ru',
        'template_s1twuir',
        templateParams
      );

      toast({
        title: 'Message Sent!',
        description: "Thanks for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: 'Failed to Send',
        description: 'Please try again or email me directly at vyomkushvaha@gmail.com',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-neon">Touch</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Want to collaborate or say hi? Feel free to reach out using the form below or via email.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-fade-in-up">
          {/* Contact Info */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 md:mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                    <Mail className="text-primary" size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Email</h4>
                    <a
                      href="mailto:vyomkushvaha@gmail.com"
                      className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                    >
                      vyomkushvaha@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0">
                    <MapPin className="text-accent" size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Location</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Anand, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="terminal p-4 sm:p-6">
              <div className="space-y-2 font-mono text-xs sm:text-sm">
                <div className="flex items-center space-x-2">
                  <span className="terminal-prompt">$</span>
                  <span className="text-foreground">cat contact.txt</span>
                </div>
                <div className="terminal-comment pl-4 space-y-1">
                  <p>I'm always open to:</p>
                  <p>• Collaboration opportunities</p>
                  <p>• Learning together</p>
                  <p>• Tech discussions</p>
                  <p>• Project feedback</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-glow">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="bg-background border-border focus:border-primary text-sm sm:text-base w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="bg-background border-border focus:border-primary text-sm sm:text-base w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows={5}
                  className="bg-background border-border focus:border-primary resize-none text-sm sm:text-base w-full"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full btn-neon text-sm sm:text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
