import { useEffect, useRef } from 'react';
import { AlertTriangle, CloudRain, TrendingUp, Clock, MapPin } from 'lucide-react';

const challengeCards = [
  {
    icon: CloudRain,
    title: 'Unpredictable Rainfall',
    description: 'The Dinaric Alps create complex precipitation patterns. Short, intense storms can trigger flash flooding within hours.',
  },
  {
    icon: MapPin,
    title: 'Vulnerable Geography',
    description: 'Over 70% of BiH\'s river basins lie in flood-prone zones, with mountainous terrain accelerating runoff into populated valleys.',
  },
  {
    icon: Clock,
    title: 'Insufficient Warning Time',
    description: 'Traditional monitoring provides less than 1 hour of warning. Effective evacuation requires at least 6 hours of advance notice.',
  },
  {
    icon: TrendingUp,
    title: 'Climate Change Amplification',
    description: 'Frequency of extreme weather events in the Balkans has increased by 35% since 1990, intensifying the urgency for adaptive systems.',
  },
];

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section id="problem" ref={sectionRef} className="reveal py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-orange-400" />
            <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">The Challenge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Flooding in{' '}
            <span style={{ color: '#38bdf8' }}>Bosnia & Herzegovina</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            The Western Balkans face a growing flood crisis. Without automated, data-driven warning systems,
            communities remain dangerously exposed to rapid river flooding events.
          </p>
        </div>

        {/* Challenge Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {challengeCards.map((card, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-5 border border-white/5 hover:border-electric/20 transition-all duration-300 group hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors">
                <card.icon size={18} className="text-electric" />
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">{card.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
