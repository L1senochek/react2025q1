import { SortDirection } from '@pages/main-page/ui/country-list.tsx';

import styles from './swap-icon.module.scss';

export const SwapIcon = ({ direction }: { direction: SortDirection }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="currentColor"
		>
			<path
				className={direction === 'asc' ? styles.active : styles.arrow}
				d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80"
			/>
			<path
				className={direction === 'desc' ? styles.active : styles.arrow}
				d="M400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z"
			/>
		</svg>
	);
};
