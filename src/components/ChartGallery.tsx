import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import chart1FeatureImportance from '../charts/chart1_feature_importance.png';
import chart2ActualVsPredicted from '../charts/chart2_actual_vs_predicted.png';
import chart3MaeComparison from '../charts/chart3_mae_comparison.png';
import chart4R2Horizons from '../charts/chart4_r2_horizons.png';
import chart5ConfusionMatrix from '../charts/chart5_confusion_matrix.png';
import chart6ErrorOverTime from '../charts/chart6_error_over_time.png';
import chart7RiskDistribution from '../charts/chart7_risk_distribution.png';

const chartItems = [
  {
    src: chart1FeatureImportance,
    title: 'Feature Importance',
    description: 'Model feature importances derived from the pipeline to show which inputs most influence flood risk predictions.',
  },
  {
    src: chart2ActualVsPredicted,
    title: 'Actual vs Predicted',
    description: 'Comparison of ground-truth flood measurements with model predictions across the validation set.',
  },
  {
    src: chart3MaeComparison,
    title: 'MAE Comparison',
    description: 'Mean absolute error trends for different model variants to highlight prediction accuracy performance.',
  },
  {
    src: chart4R2Horizons,
    title: 'R² by Forecast Horizon',
    description: 'R-squared scores by prediction horizon show how model reliability varies over time.',
  },
  {
    src: chart5ConfusionMatrix,
    title: 'Confusion Matrix',
    description: 'Classification performance across flood-risk categories and false alarm rates.',
  },
  {
    src: chart6ErrorOverTime,
    title: 'Error Over Time',
    description: 'Prediction error trends over time help identify periods of over- and under-confidence.',
  },
  {
    src: chart7RiskDistribution,
    title: 'Risk Distribution',
    description: 'Distribution of predicted flood risk values across the monitored region.',
  },
];

export default function ChartGallery() {
  const [selectedChart, setSelectedChart] = useState<number | null>(null);

  useEffect(() => {
    if (selectedChart === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedChart(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedChart]);

  return (
    <section id="charts" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Full Chart Gallery
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            Click any chart to view the full version from your pipeline results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {chartItems.map((chart, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedChart(index)}
              className="glass rounded-3xl overflow-hidden border border-white/5 shadow-xl shadow-black/10 text-left focus:outline-none focus:ring-2 focus:ring-electric/50"
            >
              <img
                src={chart.src}
                alt={chart.title}
                className="w-full h-56 object-cover bg-slate-950"
              />
              <div className="p-5">
                <h4 className="font-semibold text-white mb-2">{chart.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{chart.description}</p>
              </div>
            </button>
          ))}
        </div>

        {selectedChart !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
            <button
              type="button"
              onClick={() => setSelectedChart(null)}
              className="absolute top-6 right-6 rounded-full bg-black/70 p-3 text-slate-100 hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-electric"
              aria-label="Close chart preview"
            >
              <X size={20} />
            </button>
            <div className="max-w-[95vw] max-h-[95vh] overflow-hidden rounded-3xl bg-slate-950 border border-white/10 shadow-2xl">
              <img
                src={chartItems[selectedChart].src}
                alt={chartItems[selectedChart].title}
                className="w-full max-h-[80vh] object-contain bg-slate-950"
              />
              <div className="p-5">
                <h4 className="font-semibold text-white mb-2">{chartItems[selectedChart].title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{chartItems[selectedChart].description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
