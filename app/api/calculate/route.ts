import { NextResponse } from 'next/server';
import { calculateMuscleGain } from '@/lib/calculations/muscle-gain';
import { FormData, CalculationResult } from '@/lib/types';

export async function POST(request: Request) {
	const formData: FormData = await request.json();
	const result: CalculationResult = await calculateMuscleGain(formData);
	return NextResponse.json(result);
}
