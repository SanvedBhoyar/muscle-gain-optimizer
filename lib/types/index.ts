export interface FormData {
	weight: number;
	workoutFrequency: number;
	intensity: string;
	protein: number;
	sleep: number;
	targetGain: number;
	diet: string;
}

export interface CalculationResult {
	weeklyGain: number[];
	cumulativeGain: number[];
	confidenceInterval: [number, number];
	badges: string[];
	feedback: string[];
	dietSuggestions: string[];
	intensityPValue: number;
}
