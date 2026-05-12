import { useState, useEffect, useRef } from 'react';
import { Activity, Droplets, AlertTriangle, ShieldCheck, Bell, BellOff, Gauge } from 'lucide-react';

type AlertLevel = 'safe' | 'warning' | 'critical';

function getLevel(value: number): AlertLevel {
  if (value < 200) return 'safe';
  if (value <= 350) return 'warning';
  return 'critical';
}

const levelConfig = {
  safe: {
    label: 'SAFE',
    sublabel: 'Normal Water Level',
    color: '#22c55e',
    ringColor: '#22c55e',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.25)',
    textColor: '#86efac',
    description: 'Water levels are within normal operating range. No flood risk detected. Continue routine monitoring.',
    icon: ShieldCheck,
  },
  warning: {
    label: 'WARNING',
    sublabel: 'Elevated Water Level',
    color: '#f59e0b',
    ringColor: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
    textColor: '#fcd34d',
    description: 'Water level approaching flood threshold. Alert issued to local authorities. Prepare evacuation procedures.',
    icon: AlertTriangle,
  },
  critical: {
    label: 'CRITICAL — FLOOD',
    sublabel: 'Flood Risk Imminent',
    color: '#ef4444',
    ringColor: '#ef4444',
    bg: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.35)',
    textColor: '#fca5a5',
    description: 'FLOOD RISK IMMINENT. Immediate evacuation required. Emergency services notified. Buzzer alarm activated.',
    icon: Bell,
  },
};

function WaterTank({ level, maxLevel = 500 }: { level: number; maxLevel?: number }) {
  const fillPercent = Math.min((level / maxLevel) * 100, 100);
  const levelConfig2 = getLevel(level);

  const colors = {
    safe: ['#22c55e', '#16a34a'],
    warning: ['#f59e0b', '#d97706'],
    critical: ['#ef4444', '#dc2626'],
  };

  const [c1, c2] = colors[levelConfig2];

  return (
    <div className="relative w-28 h-48 flex flex-col items-center">
      {/* Tank body */}
      <div
        className="w-full flex-1 rounded-2xl border-2 overflow-hidden relative"
        style={{ borderColor: `${c1}40`, background: 'rgba(255,255,255,0.03)' }}
      >
        {/* Water fill */}
        <div
          className="absolute bottom-0 left-0 right-0 transition-all duration-700"
          style={{
            height: `${fillPercent}%`,
            background: `linear-gradient(to top, ${c2}cc, ${c1}99)`,
          }}
        >
          {/* Wave effect on top */}
          <div
            className="absolute top-0 left-0 right-0 h-3 opacity-60"
            style={{
              background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${c1}ff, transparent)`,
              animation: 'wave 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Level markers */}
        {[200, 350].map(marker => (
          <div
            key={marker}
            className="absolute left-0 right-0 flex items-center"
            style={{ bottom: `${(marker / maxLevel) * 100}%` }}
          >
            <div className="h-px flex-1 opacity-40" style={{ background: marker === 350 ? '#ef4444' : '#f59e0b' }} />
            <span className="text-[8px] font-mono px-1 opacity-60" style={{ color: marker === 350 ? '#ef4444' : '#f59e0b' }}>
              {marker}
            </span>
          </div>
        ))}
      </div>

      {/* Level readout */}
      <div className="mt-2 text-center">
        <span className="text-lg font-bold font-mono" style={{ color: c1 }}>{level}</span>
        <span className="text-xs text-slate-500 ml-1">cm</span>
      </div>
    </div>
  );
}

function PulseIndicator({ level }: { level: AlertLevel }) {
  const cfg = levelConfig[level];
  const Icon = cfg.icon;

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      {/* Rings */}
      <div
        className="absolute w-full h-full rounded-full opacity-0"
        style={{
          background: `${cfg.color}20`,
          border: `2px solid ${cfg.color}60`,
          animation: 'pulseRing 2s ease-out infinite',
        }}
      />
      <div
        className="absolute w-16 h-16 rounded-full opacity-0"
        style={{
          background: `${cfg.color}20`,
          border: `2px solid ${cfg.color}40`,
          animation: 'pulseRing 2s ease-out infinite',
          animationDelay: '0.6s',
        }}
      />
      {/* Center */}
      <div
        className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: `${cfg.color}25`, border: `2px solid ${cfg.color}60` }}
      >
        <Icon size={22} style={{ color: cfg.color }} />
      </div>
    </div>
  );
}

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

export default function LiveSimulation() {
  const [waterLevel, setWaterLevel] = useState(120);
  const [history, setHistory] = useState<{ level: number; time: string }[]>([]);
  const [alertSound, setAlertSound] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prevLevel = useRef(waterLevel);
  useReveal(sectionRef);

  const level = getLevel(waterLevel);
  const cfg = levelConfig[level];

  // Track history
  useEffect(() => {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setHistory(prev => {
      if (prev.length > 0 && Math.abs(prev[prev.length - 1].level - waterLevel) < 5) return prev;
      return [...prev.slice(-7), { level: waterLevel, time: now }];
    });
  }, [waterLevel]);

  // Alert sound toggle on critical
  useEffect(() => {
    if (level === 'critical' && prevLevel.current !== 'critical') {
      setAlertSound(true);
    }
    prevLevel.current = level;
  }, [level]);

  const presets = [
    { label: 'Low', value: 80 },
    { label: 'Normal', value: 150 },
    { label: 'High', value: 270 },
    { label: 'Critical', value: 420 },
  ];

  return (
    <section id="simulation" ref={sectionRef} className="reveal py-28 px-6" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(14,165,233,0.02) 50%, transparent 100%)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Activity size={16} className="text-electric" />
            <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Interactive</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Live{' '}
            <span style={{ color: '#38bdf8' }}>Simulation</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            Interact with the early-warning system in real time. Adjust the water level
            slider to see how the system responds and generates alerts.
          </p>
        </div>

        {/* Main Simulation Widget */}
        <div
          className="glass-strong rounded-3xl p-6 sm:p-8 border transition-all duration-500"
          style={{ borderColor: cfg.border, boxShadow: `0 0 40px ${cfg.color}08` }}
        >
          {/* Status Header */}
          <div
            className="rounded-2xl p-4 mb-8 flex items-center justify-between flex-wrap gap-4 transition-all duration-500"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
          >
            <div className="flex items-center gap-4">
              <PulseIndicator level={level} />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xl sm:text-2xl font-bold font-mono tracking-wider"
                    style={{ color: cfg.color }}
                  >
                    {cfg.label}
                  </span>
                  {level === 'critical' && alertSound && (
                    <Bell size={16} className="text-red-400 animate-bounce" />
                  )}
                </div>
                <p className="text-sm font-medium" style={{ color: cfg.textColor }}>{cfg.sublabel}</p>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">{cfg.description}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <p className="text-3xl font-bold font-mono" style={{ color: cfg.color }}>{waterLevel}</p>
                <p className="text-xs text-slate-500 font-mono">cm water level</p>
              </div>
              <button
                onClick={() => setAlertSound(v => !v)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', color: alertSound ? cfg.color : '#64748b' }}
              >
                {alertSound ? <Bell size={12} /> : <BellOff size={12} />}
                {alertSound ? 'Alarm On' : 'Alarm Off'}
              </button>
            </div>
          </div>

          {/* Simulation Area */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Water Tank Visual */}
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">River Level</p>
              <WaterTank level={waterLevel} />
            </div>

            {/* Slider Control */}
            <div className="md:col-span-2 flex flex-col justify-center gap-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Gauge size={15} className="text-slate-400" />
                    <span className="text-sm font-medium text-slate-300">Water Level Control</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">0 – 500 cm</span>
                </div>

                {/* Custom Slider */}
                <div className="relative py-2">
                  <div className="relative h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    {/* Safe zone */}
                    <div className="absolute left-0 top-0 bottom-0 bg-green-500/25" style={{ width: '40%' }} />
                    {/* Warning zone */}
                    <div className="absolute top-0 bottom-0 bg-amber-500/25" style={{ left: '40%', width: '30%' }} />
                    {/* Critical zone */}
                    <div className="absolute right-0 top-0 bottom-0 bg-red-500/25" style={{ width: '30%' }} />
                    {/* Fill */}
                    <div
                      className="absolute left-0 top-0 bottom-0 transition-all duration-300"
                      style={{
                        width: `${(waterLevel / 500) * 100}%`,
                        background: `linear-gradient(to right, #22c55e, ${waterLevel > 200 ? '#f59e0b' : '#22c55e'}, ${waterLevel > 350 ? '#ef4444' : waterLevel > 200 ? '#f59e0b' : '#22c55e'})`,
                      }}
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={500}
                    value={waterLevel}
                    onChange={e => setWaterLevel(Number(e.target.value))}
                    className="absolute inset-x-0 top-0 w-full h-7 opacity-0 cursor-pointer"
                    style={{ margin: 0 }}
                  />
                  {/* Thumb indicator */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 shadow-lg transition-all duration-300 pointer-events-none"
                    style={{
                      left: `calc(${(waterLevel / 500) * 100}% - 10px)`,
                      background: cfg.color,
                      borderColor: 'rgba(255,255,255,0.8)',
                      boxShadow: `0 0 10px ${cfg.color}80`,
                    }}
                  />
                </div>

                {/* Zone labels */}
                <div className="flex justify-between text-[10px] font-mono mt-2">
                  <span className="text-green-500">SAFE &lt;200cm</span>
                  <span className="text-amber-500">WARNING 200–350cm</span>
                  <span className="text-red-500">CRITICAL &gt;350cm</span>
                </div>
              </div>

              {/* Presets */}
              <div>
                <p className="text-xs text-slate-500 font-mono mb-3 uppercase tracking-wider">Quick Presets</p>
                <div className="flex gap-2 flex-wrap">
                  {presets.map(preset => (
                    <button
                      key={preset.label}
                      onClick={() => setWaterLevel(preset.value)}
                      className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border"
                      style={{
                        background: waterLevel === preset.value ? `${cfg.color}20` : 'rgba(255,255,255,0.04)',
                        borderColor: waterLevel === preset.value ? `${cfg.color}60` : 'rgba(255,255,255,0.08)',
                        color: waterLevel === preset.value ? cfg.color : '#94a3b8',
                      }}
                    >
                      {preset.label} ({preset.value}cm)
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* History Log */}
          {history.length > 1 && (
            <div className="border-t border-white/5 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={14} className="text-slate-500" />
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Session Log</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {history.map((entry, i) => {
                  const entryLevel = getLevel(entry.level);
                  const entryCfg = levelConfig[entryLevel];
                  return (
                    <div
                      key={i}
                      className="flex-shrink-0 rounded-xl px-3 py-2 text-center min-w-[72px]"
                      style={{ background: `${entryCfg.color}10`, border: `1px solid ${entryCfg.color}20` }}
                    >
                      <p className="text-xs font-bold font-mono" style={{ color: entryCfg.color }}>{entry.level}cm</p>
                      <p className="text-[9px] text-slate-500 font-mono mt-0.5">{entry.time}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Threshold Reference */}
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {[
            { range: '0 – 199 cm', status: 'SAFE', desc: 'Normal river flow. No action required.', color: '#22c55e' },
            { range: '200 – 350 cm', status: 'WARNING', desc: 'Elevated levels. Alert authorities and prepare.', color: '#f59e0b' },
            { range: '> 350 cm', status: 'CRITICAL', desc: 'Flood imminent. Immediate evacuation required.', color: '#ef4444' },
          ].map(item => (
            <div
              key={item.status}
              className="glass rounded-2xl p-4 border transition-colors"
              style={{ borderColor: `${item.color}20` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                <span className="text-xs font-bold font-mono" style={{ color: item.color }}>{item.status}</span>
              </div>
              <p className="text-sm font-mono text-slate-300 mb-1">{item.range}</p>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
