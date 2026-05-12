import { useEffect, useRef } from 'react';
import { Cpu, Radio, Volume2, Brain, GitBranch, Database, Wifi, Layers } from 'lucide-react';

const hardwareComponents = [
  {
    icon: Cpu,
    name: 'ESP32 Microcontroller',
    role: 'Processing Hub',
    description: 'Dual-core 240 MHz processor with integrated Wi-Fi and Bluetooth. Handles sensor data acquisition, preprocessing, and wireless transmission.',
    specs: ['240 MHz Xtensa LX6', 'Wi-Fi 802.11 b/g/n', '34 GPIO Pins', '520 KB SRAM'],
    color: '#0ea5e9',
  },
  {
    icon: Radio,
    name: 'Ultrasonic Sensor',
    role: 'Water Level Detection',
    description: 'HC-SR04 ultrasonic transducer measures water surface distance with ±3mm precision. Operates across 2cm–4m range for accurate level readings.',
    specs: ['±3mm Accuracy', '2cm – 4m Range', '40 kHz Frequency', 'IP65 Rated'],
    color: '#06b6d4',
  },
  {
    icon: Volume2,
    name: 'Piezo Buzzer',
    role: 'Local Alert System',
    description: 'High-decibel piezoelectric actuator triggers audible warnings at configurable thresholds. Operates independently of internet connectivity.',
    specs: ['85 dB Output', '3.3V – 5V Logic', 'PWM Frequency Control', 'Fail-safe Design'],
    color: '#38bdf8',
  },
];

const mlComponents = [
  {
    icon: GitBranch,
    name: 'Random Forest Regressor',
    role: 'Prediction Engine',
    description: 'An ensemble of 100 decision trees trained on historical rainfall, river level, and meteorological data. Provides robust predictions even with noisy sensor input.',
    specs: ['100 Estimators', 'Depth-optimized Trees', 'Bootstrap Aggregation', 'Feature Importance'],
    color: '#0ea5e9',
  },
  {
    icon: Database,
    name: 'Feature Engineering',
    role: 'Data Pipeline',
    description: 'Time-series features including rolling averages, rate-of-change, lag variables, and seasonal decomposition transform raw sensor readings into predictive signals.',
    specs: ['Rolling Windows', 'Lag Features (t-1 to t-6)', 'Rate-of-Change', 'Seasonal Encoding'],
    color: '#06b6d4',
  },
  {
    icon: Wifi,
    name: 'Real-Time Pipeline',
    role: 'Data Flow',
    description: 'MQTT protocol streams sensor data to a cloud broker. Incoming readings trigger model inference, with predictions returned in under 200ms.',
    specs: ['MQTT Protocol', '<200ms Inference', '6-Hour Horizon', 'Threshold Alerts'],
    color: '#38bdf8',
  },
];

function ComponentCard({
  icon: Icon,
  name,
  role,
  description,
  specs,
  color,
  index,
}: {
  icon: React.ElementType;
  name: string;
  role: string;
  description: string;
  specs: string[];
  color: string;
  index: number;
}) {
  return (
    <div
      className="glass rounded-2xl p-6 border border-white/5 hover:border-opacity-30 transition-all duration-300 group hover:-translate-y-1.5 flex flex-col"
      style={{ borderColor: `${color}15`, transitionDelay: `${index * 60}ms` }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}40`)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = `${color}15`)}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{ background: `${color}18` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <div>
          <p className="text-xs font-mono mb-0.5" style={{ color: `${color}cc` }}>
            {role}
          </p>
          <h3 className="font-semibold text-white text-sm leading-tight">{name}</h3>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">{description}</p>

      <div className="flex flex-wrap gap-1.5">
        {specs.map(spec => (
          <span
            key={spec}
            className="text-[10px] font-mono px-2 py-0.5 rounded-md"
            style={{ background: `${color}12`, color: `${color}cc`, border: `1px solid ${color}20` }}
          >
            {spec}
          </span>
        ))}
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
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

export default function SystemComponents() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section id="system" ref={sectionRef} className="reveal py-28 px-6" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(14,165,233,0.03) 50%, transparent 100%)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Layers size={16} className="text-electric" />
            <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            System{' '}
            <span style={{ color: '#38bdf8' }}>Components</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            A two-layer architecture: physical IoT sensors capturing real-world data,
            feeding a machine learning pipeline that generates actionable flood predictions.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="glass rounded-2xl p-6 border border-electric/10 mb-16 overflow-x-auto">
          <div className="flex items-center justify-center gap-2 sm:gap-4 min-w-max mx-auto py-2">
            {[
              { icon: Radio, label: 'Sensors', sub: 'Ultrasonic', bg: '#06b6d4' },
              { icon: Cpu, label: 'ESP32', sub: 'Edge Node', bg: '#0ea5e9' },
              { icon: Wifi, label: 'MQTT', sub: 'Protocol', bg: '#38bdf8' },
              { icon: Brain, label: 'Random Forest', sub: 'ML Model', bg: '#0ea5e9' },
              { icon: Volume2, label: 'Alert', sub: 'Buzzer / App', bg: '#06b6d4' },
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-2 sm:gap-4">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center"
                    style={{ background: `${step.bg}18`, border: `1px solid ${step.bg}30` }}
                  >
                    <step.icon size={20} style={{ color: step.bg }} />
                  </div>
                  <span className="text-xs font-medium text-white text-center whitespace-nowrap">{step.label}</span>
                  <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">{step.sub}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="flex items-center gap-0.5 mb-4">
                    <div className="w-6 sm:w-10 h-px bg-gradient-to-r from-electric/40 to-electric/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-electric/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hardware Section */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-7 rounded-lg bg-electric/10 flex items-center justify-center">
              <Cpu size={14} className="text-electric" />
            </div>
            <h3 className="text-lg font-semibold text-white">Hardware Layer</h3>
            <div className="flex-1 h-px bg-electric/10" />
            <span className="text-xs font-mono text-slate-500">IoT / Embedded</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hardwareComponents.map((comp, i) => (
              <ComponentCard key={i} {...comp} index={i} />
            ))}
          </div>
        </div>

        {/* Intelligence Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-7 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
              <Brain size={14} className="text-accent-cyan" />
            </div>
            <h3 className="text-lg font-semibold text-white">Intelligence Layer</h3>
            <div className="flex-1 h-px bg-accent-cyan/10" />
            <span className="text-xs font-mono text-slate-500">Machine Learning</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mlComponents.map((comp, i) => (
              <ComponentCard key={i} {...comp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
