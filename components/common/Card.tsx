import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export default function Card({ children }: Props) {
	return (
		<div className='bg-white/10 p-4 rounded-lg shadow-lg'>{children}</div>
	);
}
