import { ChartOptions } from 'chart.js';

export function getChartOptions(): ChartOptions {
	return {
		animation: { duration: 500 },
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				beginAtZero: true,
				ticks: { color: '#fff' },
			},
			x: {
				ticks: { color: '#fff' },
			},
		},
		plugins: {
			legend: { labels: { color: '#fff' } },
		},
	};
}
