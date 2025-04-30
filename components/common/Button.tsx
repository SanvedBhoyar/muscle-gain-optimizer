'use client';

import { motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
}

export default function Button({ className = '', ...props }: Props) {
	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className={`bg-purple-600 p-2 rounded hover:bg-purple-700 ${className}`}
			{...props}
		/>
	);
}
