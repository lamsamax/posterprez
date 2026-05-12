import { useEffect, useRef } from 'react';
import { ChevronDown, BookOpen, User, GraduationCap } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Draw multiple wave layers
      const waves = [
        { amplitude: 28, frequency: 0.008, speed: 0.012, yOffset: height * 0.55, color: 'rgba(14,165,233,0.12)', lineWidth: 2 },
        { amplitude: 20, frequency: 0.012, speed: 0.018, yOffset: height * 0.60, color: 'rgba(6,182,212,0.09)', lineWidth: 1.5 },
        { amplitude: 35, frequency: 0.006, speed: 0.008, yOffset: height * 0.65, color: 'rgba(14,165,233,0.07)', lineWidth: 2.5 },
        { amplitude: 15, frequency: 0.015, speed: 0.022, yOffset: height * 0.70, color: 'rgba(56,189,248,0.06)', lineWidth: 1 },
        { amplitude: 40, frequency: 0.005, speed: 0.005, yOffset: height * 0.75, color: 'rgba(6,182,212,0.05)', lineWidth: 3 },
      ];

      waves.forEach(wave => {
        ctx.beginPath();
        ctx.lineWidth = wave.lineWidth;
        ctx.strokeStyle = wave.color;

        for (let x = 0; x <= width; x += 2) {
          const y = wave.yOffset + Math.sin(x * wave.frequency + t * wave.speed * 100) * wave.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Draw subtle grid dots
      ctx.fillStyle = 'rgba(14,165,233,0.06)';
      const gridSize = 40;
      for (let gx = 0; gx < width; gx += gridSize) {
        for (let gy = 0; gy < height; gy += gridSize) {
          const pulse = Math.sin(t * 0.02 + gx * 0.05 + gy * 0.05) * 0.5 + 0.5;
          ctx.globalAlpha = pulse * 0.4;
          ctx.beginPath();
          ctx.arc(gx, gy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      t++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  const scrollToNext = () => {
    document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(14,165,233,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0a192f)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 border border-electric/20">
          <div className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
          <span className="text-xs font-medium text-electric font-mono tracking-wider">UNDERGRADUATE THESIS · 2026</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          <span className="text-white">Predictive </span>
          <span
            className="text-glow"
            style={{ color: '#38bdf8' }}
          >
            Early-Warning
          </span>
          <br />
          <span className="text-white">for River </span>
          <span
            style={{
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Flooding
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
          Using Rainfall Sensors and Machine Learning
        </p>

        {/* Accent line */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-electric/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-electric" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-electric/50" />
        </div>

        {/* Author & Info Cards */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <div className="glass rounded-xl px-5 py-3 flex items-center gap-3 border border-white/5">
            <User size={16} className="text-electric flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs text-slate-500 font-mono">Author</p>
              <p className="text-sm font-medium text-slate-200">Lamija Imamović</p>
            </div>
          </div>

          <div className="glass rounded-xl px-5 py-3 flex items-center gap-3 border border-white/5">
            <GraduationCap size={16} className="text-accent-cyan flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs text-slate-500 font-mono">Institution</p>
              <p className="text-sm font-medium text-slate-200">SSST</p>
            </div>
          </div>

          <div className="glass rounded-xl px-5 py-3 flex items-center gap-3 border border-white/5">
            <BookOpen size={16} className="text-electric-light flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs text-slate-500 font-mono">Mentor</p>
              <p className="text-sm font-medium text-slate-200">Edin Fazlić</p>
            </div>
          </div>
        </div>

        {/* Key stat pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { label: '98% Recall', sub: '6h Prediction' },
            { label: '0.9933 R²', sub: 'Model Score' },
            { label: 'Real-Time', sub: 'Monitoring' },
            { label: 'IoT + ML', sub: 'Integration' },
          ].map(stat => (
            <div
              key={stat.label}
              className="glass rounded-lg px-4 py-2 border border-electric/15 hover:border-electric/40 transition-colors group"
            >
              <span className="text-sm font-semibold text-electric group-hover:text-electric-light transition-colors">{stat.label}</span>
              <span className="text-xs text-slate-500 ml-2">{stat.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 hover:text-electric transition-colors flex flex-col items-center gap-1 z-10 group"
      >
        <span className="text-xs font-mono tracking-widest">EXPLORE</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}
