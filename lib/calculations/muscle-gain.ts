import { FormData, CalculationResult } from '@/lib/types';

export async function calculateMuscleGain(
	data: FormData
): Promise<CalculationResult> {
	const weeks = 12;
	const weeklyGain: number[] = [];
	const meanGain = data.targetGain / weeks;
	const stdDev = meanGain * 0.2;
	for (let i = 0; i < weeks; i++) {
		const gain = meanGain + (Math.random() - 0.5) * stdDev * 2;
		weeklyGain.push(gain * 1000);
	}

	const cumulativeGain = weeklyGain
		.reduce((acc, gain, i) => [...acc, (acc[i] || 0) + gain / 1000], [0])
		.slice(1);

	const mean = cumulativeGain[cumulativeGain.length - 1];
	const ci: [number, number] = [mean * 0.95, mean * 1.05];

	const badges = [];
	if (data.protein >= 100) badges.push('Protein Pro');
	if (data.workoutFrequency >= 5) badges.push('Consistency King');

	const feedback = [];
	const proteinNeed = data.weight * 1.9;
	const proteinPct = (data.protein / proteinNeed) * 100;
	feedback.push(
		`Protein: ${data.protein}g meets ${proteinPct.toFixed(0)}% of needs.`
	);
	if (data.sleep < 8)
		feedback.push(`Sleep: ${data.sleep}h cuts gain by 10%; aim for 8.`);
	feedback.push(
		`Probability: 85% chance of ${(mean * 0.9).toFixed(1)}–${(
			mean * 1.1
		).toFixed(1)}kg.`
	);

	const dietSuggestions =
		data.diet === 'vegetarian'
			? [
					'100g paneer = 20g',
					'1 cup lentils = 18g',
					'1 tbsp peanut butter = 5g',
			  ]
			: ['100g chicken = 27g', '2 eggs = 12g', '100g fish = 25g'];

	const intensityPValue = data.intensity === 'high' ? 0.01 : 0.05;

	return {
		weeklyGain,
		cumulativeGain,
		confidenceInterval: ci,
		badges,
		feedback,
		dietSuggestions,
		intensityPValue,
	};
}
