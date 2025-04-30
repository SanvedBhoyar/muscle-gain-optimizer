'use client';

import { Line, Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { Chart as ChartJS, registerables } from 'chart.js';
import { motion } from 'framer-motion';
import { CalculationResult } from '@/lib/types';
import Card from '@/components/common/Card';
import { getChartOptions } from '@/utils/helpers/chart-utils';

ChartJS.register(...registerables);

interface Props {
	result: CalculationResult;
}

export default function Visualizations({ result }: Props) {
	const histogramData: ChartData<'bar'> = {
		labels: result.weeklyGain.map((_, i) => `W${i + 1}`),
		datasets: [
			{
				label: 'Weekly Gain (g)',
				data: result.weeklyGain,
				backgroundColor: 'rgba(75, 192, 192, 0.6)',
			},
		],
	};

	const lineData: ChartData<'line'> = {
		labels: Array.from({ length: 12 }, (_, i) => `W${i + 1}`),
		datasets: [
			{
				label: 'Cumulative Gain (kg)',
				data: result.cumulativeGain,
				borderColor: 'rgba(255, 99, 132, 1)',
				fill: false,
			},
			{
				label: 'Lower CI',
				data: Array(12).fill(result.confidenceInterval[0]),
				borderColor: 'rgba(255, 99, 132, 0.2)',
				fill: false,
				borderDash: [5, 5],
			},
			{
				label: 'Upper CI',
				data: Array(12).fill(result.confidenceInterval[1]),
				borderColor: 'rgba(255, 99, 132, 0.2)',
				fill: false,
				borderDash: [5, 5],
			},
		],
	};

	const boxData: ChartData<'bar'> = {
		labels: ['Low', 'Med', 'High'],
		datasets: [
			{
				label: 'Strength Gain (kg)',
				data: [3, 4, 5],
				backgroundColor: [
					'rgba(255, 159, 64, 0.6)',
					'rgba(255, 205, 86, 0.6)',
					'rgba(54, 162, 235, 0.6)',
				],
			},
		],
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className='space-y-4'
		>
			<Card>
				<h3 className='text-lg mb-2'>Weekly Gain</h3>
				<Bar data={histogramData} options={getChartOptions()} />
			</Card>
			<Card>
				<h3 className='text-lg mb-2'>Cumulative Gain</h3>
				<Line data={lineData} options={getChartOptions()} />
			</Card>
			<Card>
				<h3 className='text-lg mb-2'>Strength by Intensity</h3>
				<Bar data={boxData} options={getChartOptions()} />
			</Card>
		</motion.div>
	);
}
