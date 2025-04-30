'use client';

import { motion } from 'framer-motion';
import { CalculationResult } from '@/lib/types';
import Card from '@/components/common/Card';

interface Props {
	result: CalculationResult;
}

export default function Feedback({ result }: Props) {
	return (
		<Card>
			<h2 className='text-xl mb-3'>Feedback</h2>
			<div className='space-y-3'>
				{result.badges.length > 0 && (
					<div>
						<h3 className='text-sm'>Badges:</h3>
						{result.badges.map((badge, i) => (
							<motion.span
								key={i}
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								className='inline-block bg-yellow-400 text-black px-2 py-1 rounded mr-2 text-sm'
							>
								{badge}
							</motion.span>
						))}
					</div>
				)}
				<div>
					<h3 className='text-sm'>Diet Suggestions:</h3>
					<ul className='list-disc pl-4 text-sm'>
						{result.dietSuggestions.map((s, i) => (
							<li key={i}>{s}</li>
						))}
					</ul>
				</div>
				<div>
					<h3 className='text-sm'>Progress:</h3>
					<ul className='list-disc pl-4 text-sm'>
						{result.feedback.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>
				</div>
				<div>
					<h3 className='text-sm'>Intensity:</h3>
					<p className='text-sm'>
						P-value: {result.intensityPValue.toFixed(2)}
					</p>
				</div>
			</div>
		</Card>
	);
}
