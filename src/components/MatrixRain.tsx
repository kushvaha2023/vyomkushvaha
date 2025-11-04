import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Include Japanese katakana characters for authentic Matrix effect
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const chars = katakana + latin + nums;
    
    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    // Theme-aware colors
    const isDark = theme === 'dark';
    const bgColor = isDark ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
    const textColorBase = isDark ? '0, 255, 65' : '40, 40, 40'; // Green for dark, dark gray for light

    const draw = () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Add variation in brightness for depth and glow effect
        const opacity = Math.random() * 0.3 + 0.7;
        ctx.fillStyle = `rgba(${textColorBase}, ${opacity})`;
        ctx.font = `${fontSize}px JetBrains Mono, monospace`;
        
        // Add subtle glow in dark mode
        if (isDark) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(0, 255, 65, ${opacity * 0.6})`;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fillText(text, x, y);

        // Occasionally reset drops
        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-10 opacity-40 dark:opacity-45 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default MatrixRain;
