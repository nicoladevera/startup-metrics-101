import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Card } from '@/components/ui/card';

Chart.register(...registerables);

interface MetricChartProps {
  type: 'line' | 'bar' | 'gauge';
  data: number[];
  labels: string[];
  title: string;
}

export function MetricChart({ type, data, labels, title }: MetricChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    if (type === 'gauge') {
      const value = data[0] || 0;
      const max = Math.max(...data) * 1.2 || 100;
      
      chartRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Current', 'Remaining'],
          datasets: [{
            data: [value, Math.max(0, max - value)],
            backgroundColor: [
              value >= max * 0.7 ? '#10B981' : value >= max * 0.4 ? '#F59E0B' : '#EF4444',
              '#E5E7EB'
            ],
            borderWidth: 0,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          circumference: 180,
          rotation: -90,
          cutout: '75%',
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: true
            }
          }
        }
      });
    } else {
      chartRef.current = new Chart(ctx, {
        type: type,
        data: {
          labels: labels,
          datasets: [{
            label: title,
            data: data,
            backgroundColor: type === 'bar' ? '#2563EB' : 'transparent',
            borderColor: '#2563EB',
            borderWidth: 3,
            tension: 0.4,
            fill: type === 'line',
            pointBackgroundColor: '#2563EB',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: window.innerWidth < 768 ? 1 : 2,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#1F2937',
              padding: 12,
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: '#374151',
              borderWidth: 1,
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: '#E5E7EB'
              },
              ticks: {
                color: '#6B7280'
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#6B7280'
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [type, data, labels, title]);

  return (
    <Card className="p-5 shadow-sm" data-testid="metric-chart">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="relative">
        <canvas ref={canvasRef} />
      </div>
    </Card>
  );
}
