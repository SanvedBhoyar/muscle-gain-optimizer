'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalculationResult, FormData } from '@/lib/types';
import Button from '@/components/common/Button';

interface Props {
	onSubmit: (result: CalculationResult) => void;
}

export default function InputForm({ onSubmit }: Props) {
	const [formData, setFormData] = useState<FormData>({
		weight: 70,
		workoutFrequency: 3,
		intensity: 'medium',
		protein: 90,
		sleep: 7,
		targetGain: 1,
		diet: 'vegetarian',
	});

	const handleSubmit = async () => {
		const response = await fetch('/api/calculate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData),
		});
		const result: CalculationResult = await response.json();
		onSubmit(result);
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			className='bg-white/10 p-4 rounded-lg shadow-lg'
		>
			<h2 className='text-xl mb-4'>Enter Details</h2>
			<div className='space-y-3'>
				{[
					{
						label: 'Weight (50–120 kg)',
						key: 'weight',
						type: 'number',
						min: 50,
						max: 120,
					},
					{
						label: 'Workouts (1–7/week)',
						key: 'workoutFrequency',
						type: 'number',
						min: 1,
						max: 7,
					},
					{
						label: 'Intensity',
						key: 'intensity',
						type: 'select',
						options: [
							{ value: 'low', label: 'Low (6–8 reps)' },
							{ value: 'medium', label: 'Medium (8–10 reps)' },
							{ value: 'high', label: 'High (10–12 reps)' },
						],
					},
					{
						label: 'Protein (50–200 g/day)',
						key: 'protein',
						type: 'number',
						min: 50,
						max: 200,
					},
					{
						label: 'Sleep (4–10 h/night)',
						key: 'sleep',
						type: 'number',
						min: 4,
						max: 10,
					},
					{
						label: 'Target Gain (0.5–2 kg)',
						key: 'targetGain',
						type: 'number',
						min: 0.5,
						max: 2,
						step: 0.1,
					},
					{
						label: 'Diet',
						key: 'diet',
						type: 'select',
						options: [
							{ value: 'vegetarian', label: 'Vegetarian' },
							{
								value: 'non-vegetarian',
								label: 'Non-Vegetarian',
							},
						],
					},
				].map(({ label, key, type, min, max, step, options }) => (
					<div key={key}>
						<label className='block text-sm'>{label}:</label>
						{type === 'select' ? (
							<select
								value={formData[key as keyof FormData]}
								onChange={(e) =>
									setFormData({
										...formData,
										[key]: e.target.value,
									})
								}
								className='w-full p-2 bg-white/20 rounded text-black'
							>
								{options!.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						) : (
							<input
								type={type}
								min={min}
								max={max}
								step={step}
								value={formData[key as keyof FormData]}
								onChange={(e) =>
									setFormData({
										...formData,
										[key]: +e.target.value,
									})
								}
								className='w-full p-2 bg-white/20 rounded text-black'
							/>
						)}
					</div>
				))}
				<Button onClick={handleSubmit} className='w-full'>
					Calculate
				</Button>
			</div>
		</motion.div>
	);
}
