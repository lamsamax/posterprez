import { useEffect, useRef, useState } from 'react';
import { BarChart3, CheckCircle, Target, TrendingUp, Award, Clock } from 'lucide-react';

function CircularMetric({
  value,
  maxValue,
  label,
  sublabel,
  color,
  size = 120,
  visible,
}: {
  value: number;
  maxValue: number;
  label: string;
  sublabel: string;
  color: string;
  size?: number;
  visible: boolean;
}) {
  const [animValue, setAnimValue] = useState(0);
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = animValue / maxValue;
  const strokeDashoffset = circumference * (1 - progress);

  useEffect(() => {
    if (!visible) return;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimValue(value * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, value]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={8}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'none', filter: `drop-shadow(0 0 6px ${color}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-white font-mono leading-none">{label}</span>
          <span className="text-[10px] text-slate-500 font-mono mt-0.5">{sublabel}</span>
        </div>
      </div>
    </div>
  );
}

function MetricBar({
  label,
  value,
  displayValue,
  color,
  visible,
  delay = 0,
}: {
  label: string;
  value: number;
  displayValue: string;
  color: string;
  visible: boolean;
  delay?: number;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      const duration = 1500;
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setWidth(value * eased);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [visible, value, delay]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300 font-medium">{label}</span>
        <span className="text-sm font-mono font-semibold" style={{ color }}>{displayValue}</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-none"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

const allMetrics = [
  { label: 'Recall (6h Prediction)', value: 98, displayValue: '98.0%', color: '#0ea5e9', delay: 0 },
  { label: 'Precision', value: 96.5, displayValue: '96.5%', color: '#06b6d4', delay: 100 },
  { label: 'F1-Score', value: 97.2, displayValue: '97.2%', color: '#38bdf8', delay: 200 },
  { label: 'R² Score (Regression)', value: 99.33, displayValue: '0.9933', color: '#0ea5e9', delay: 300 },
  { label: 'MAE (cm)', value: 84, displayValue: '1.84 cm', color: '#06b6d4', delay: 400 },
  { label: 'Training Accuracy', value: 99.1, displayValue: '99.1%', color: '#38bdf8', delay: 500 },
];

const statCards = [
  { icon: CheckCircle, label: 'Recall at 6h', value: '98%', sub: 'Classification', color: '#0ea5e9' },
  { icon: Target, label: 'R² Score', value: '0.9933', sub: 'Regression Fit', color: '#06b6d4' },
  { icon: Clock, label: 'Warning Horizon', value: '6 Hours', sub: 'Advance Notice', color: '#38bdf8' },
  { icon: Award, label: 'F1-Score', value: '97.2%', sub: 'Balanced Metric', color: '#0ea5e9' },
];

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
}

export default function ResultsDashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useReveal(sectionRef);

  return (
    <section id="results" ref={sectionRef} className="reveal py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <BarChart3 size={16} className="text-electric" />
            <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Performance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Results{' '}
            <span style={{ color: '#38bdf8' }}>Dashboard</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            The Random Forest Regressor demonstrates exceptional predictive accuracy across
            all key performance metrics, validated on real-world flood event datasets.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-5 border border-white/5 hover:border-opacity-30 transition-all duration-300 group"
              style={{ borderColor: `${card.color}15` }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${card.color}40`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = `${card.color}15`)}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${card.color}18` }}
              >
                <card.icon size={16} style={{ color: card.color }} />
              </div>
              <div className="text-2xl font-bold font-mono mb-0.5" style={{ color: card.color }}>
                {card.value}
              </div>
              <div className="text-xs font-semibold text-white mb-0.5">{card.label}</div>
              <div className="text-[10px] text-slate-500">{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Circular Gauges */}
          <div className="glass rounded-2xl p-6 border border-electric/10">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={15} className="text-electric" />
              <h3 className="text-sm font-semibold text-white">Key Indicators</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <CircularMetric
                value={98}
                maxValue={100}
                label="98%"
                sublabel="Recall"
                color="#0ea5e9"
                size={110}
                visible={visible}
              />
              <CircularMetric
                value={99.33}
                maxValue={100}
                label="0.993"
                sublabel="R² Score"
                color="#06b6d4"
                size={110}
                visible={visible}
              />
              <CircularMetric
                value={97.2}
                maxValue={100}
                label="97.2%"
                sublabel="F1-Score"
                color="#38bdf8"
                size={110}
                visible={visible}
              />
            </div>

            {/* Model Info */}
            <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-2 gap-3">
              {[
                { label: 'Algorithm', value: 'Random Forest' },
                { label: 'Estimators', value: '100 Trees' },
                { label: 'Prediction Horizon', value: '6 Hours' },
                { label: 'Dataset Size', value: '8,760 Samples' },
              ].map(item => (
                <div key={item.label} className="bg-white/3 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-slate-500 font-mono mb-0.5">{item.label}</p>
                  <p className="text-xs font-medium text-slate-300">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Metrics */}
          <div className="glass rounded-2xl p-6 border border-electric/10">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 size={15} className="text-electric" />
              <h3 className="text-sm font-semibold text-white">Performance Metrics</h3>
            </div>
            <div className="space-y-5">
              {allMetrics.map((metric) => (
                <MetricBar key={metric.label} {...metric} visible={visible} />
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Note */}
        <div className="mt-6 glass rounded-2xl p-5 border border-electric/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle size={18} className="text-electric" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1 text-sm">Benchmark Comparison</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The Random Forest Regressor outperformed Linear Regression (R² = 0.87), Decision Tree (R² = 0.94),
                and LSTM baseline (R² = 0.96) across all evaluation metrics, while maintaining real-time
                inference capability on embedded hardware.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
