import { Waves, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-electric/10 flex items-center justify-center border border-electric/20">
              <Waves size={16} className="text-electric" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Lamija Imamović</p>
              <p className="text-xs text-slate-500">Undergraduate Thesis · SSST · 2026</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-slate-500 font-mono leading-relaxed">
              Predictive Early-Warning for River Flooding<br />
              Using Rainfall Sensors and Machine Learning
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500 mb-1">Mentor</p>
            <p className="text-sm text-slate-300 font-medium">Edin Fazlić</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-electric" />
              <p className="text-xs text-slate-500 font-mono">SSST, Sarajevo</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600 font-mono">© 2026 Sarajevo School of Science and Technology</p>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span>Built with React, Tailwind CSS, and IoT + ML research</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
