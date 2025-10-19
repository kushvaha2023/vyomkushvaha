import { useEffect, useRef } from 'react';

interface Branch {
  x: number;
  y: number;
  angle: number;
  length: number;
  width: number;
  generation: number;
  growing: boolean;
  currentLength: number;
}

const MultiverseTree = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const branches: Branch[] = [];
    const maxGenerations = 6;
    const growthSpeed = 2;

    // Initialize root branches
    const initBranches = () => {
      branches.length = 0;
      const numRoots = 3;
      for (let i = 0; i < numRoots; i++) {
        branches.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 50,
          angle: -Math.PI / 2 + (Math.random() - 0.5) * 0.8,
          length: 80 + Math.random() * 40,
          width: 8,
          generation: 0,
          growing: true,
          currentLength: 0,
        });
      }
    };

    const createChildBranches = (parent: Branch) => {
      if (parent.generation >= maxGenerations) return;

      const numChildren = Math.floor(Math.random() * 2) + 2;
      
      for (let i = 0; i < numChildren; i++) {
        const angleVariation = (Math.random() - 0.5) * Math.PI / 2;
        const newAngle = parent.angle + angleVariation;
        
        const endX = parent.x + Math.cos(parent.angle) * parent.length;
        const endY = parent.y + Math.sin(parent.angle) * parent.length;

        branches.push({
          x: endX,
          y: endY,
          angle: newAngle,
          length: parent.length * (0.6 + Math.random() * 0.2),
          width: parent.width * 0.7,
          generation: parent.generation + 1,
          growing: true,
          currentLength: 0,
        });
      }
    };

    const drawBranch = (branch: Branch) => {
      const startX = branch.x;
      const startY = branch.y;
      const endX = startX + Math.cos(branch.angle) * branch.currentLength;
      const endY = startY + Math.sin(branch.angle) * branch.currentLength;

      // Create gradient for glow effect
      const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
      const opacity = Math.max(0.3, 1 - branch.generation * 0.15);
      
      gradient.addColorStop(0, `rgba(0, 255, 65, ${opacity * 0.6})`);
      gradient.addColorStop(0.5, `rgba(100, 255, 150, ${opacity})`);
      gradient.addColorStop(1, `rgba(150, 255, 200, ${opacity * 0.8})`);

      // Draw glow
      ctx.shadowBlur = 15 + (6 - branch.generation) * 3;
      ctx.shadowColor = 'rgba(0, 255, 65, 0.8)';
      
      // Draw branch
      ctx.strokeStyle = gradient;
      ctx.lineWidth = branch.width;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Add extra glow at the tip
      if (branch.currentLength === branch.length) {
        ctx.beginPath();
        ctx.arc(endX, endY, branch.width * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 65, ${opacity * 0.6})`;
        ctx.fill();
      }
    };

    const animate = () => {
      // Fade effect for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let allComplete = true;

      branches.forEach((branch) => {
        if (branch.growing) {
          branch.currentLength += growthSpeed;
          if (branch.currentLength >= branch.length) {
            branch.currentLength = branch.length;
            branch.growing = false;
            
            // 60% chance to create children
            if (Math.random() > 0.4) {
              createChildBranches(branch);
            }
          }
          allComplete = false;
        }

        if (branch.currentLength > 0) {
          drawBranch(branch);
        }
      });

      // Restart when all branches are complete
      if (allComplete && branches.length > 0) {
        setTimeout(initBranches, 2000);
      }
    };

    initBranches();
    const interval = setInterval(animate, 1000 / 60);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBranches();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      aria-hidden="true"
      style={{ background: 'radial-gradient(ellipse at center, #001a0d 0%, #000000 100%)' }}
    />
  );
};

export default MultiverseTree;
