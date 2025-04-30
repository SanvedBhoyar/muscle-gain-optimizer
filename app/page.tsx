'use client';

import { useState } from 'react';
import InputForm from '@/components/ui/InputForm';
import Visualizations from '@/components/ui/Visualizations';
import Feedback from '@/components/ui/Feedback';
import { CalculationResult } from '@/lib/types';
import { motion } from 'framer-motion';

export default function Home() {
	const [result, setResult] = useState<CalculationResult | null>(null);

	return (
		<div className='min-h-screen p-4'>
			<motion.h1
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className='text-3xl font-bold text-center mb-6'
			>
				Muscle Gain Optimizer
			</motion.h1>
			<div className='max-w-4xl mx-auto grid grid-cols-1 gap-6'>
				<InputForm onSubmit={setResult} />
				{result && (
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<Visualizations result={result} />
						<Feedback result={result} />
					</div>
				)}
			</div>
		</div>
	);
}
