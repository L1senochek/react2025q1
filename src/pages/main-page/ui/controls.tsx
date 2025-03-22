import { ChangeEvent, useCallback } from 'react';
import { SortDirection } from '@pages/main-page/ui/country-list.tsx';
import { SwapIcon } from '@pages/main-page/ui/swap-icon.tsx';

import styles from './controls.module.scss';

interface Props {
	setQuery: (query: string) => void;
	sortByNameDirection: SortDirection;
	setSortByNameDirection: (direction: SortDirection) => void;
	sortByPopulationDirection: SortDirection;
	setSortByPopulationDirection: (populationDirection: SortDirection) => void;
	regions: string[];
	setRegion: (region: string) => void;
}

export const Controls = ({
	setQuery,
	sortByNameDirection,
	setSortByNameDirection,
	sortByPopulationDirection,
	setSortByPopulationDirection,
	regions,
	setRegion,
}: Props) => {
	const handleQueryChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			setQuery(value);
		},
		[setQuery]
	);

	const handleSortByNameClick = useCallback(() => {
		setSortByPopulationDirection('');
		if (sortByNameDirection === 'asc') setSortByNameDirection('desc');
		else setSortByNameDirection('asc');
	}, [
		setSortByNameDirection,
		setSortByPopulationDirection,
		sortByNameDirection,
	]);

	const handleSortByPopulationClick = useCallback(() => {
		setSortByNameDirection('');
		if (sortByPopulationDirection === 'asc')
			setSortByPopulationDirection('desc');
		else setSortByPopulationDirection('asc');
	}, [
		setSortByNameDirection,
		setSortByPopulationDirection,
		sortByPopulationDirection,
	]);

	const handleRegionChange = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const { value } = event.target;
			setRegion(value);
		},
		[setRegion]
	);

	return (
		<div className={styles.controls}>
			<div className={styles.controlsControl}>
				<label htmlFor={'query'}>Search by name</label>
				<input
					className={styles.controlsControlInput}
					type={'text'}
					id={'query'}
					name={'query'}
					onChange={handleQueryChange}
				/>
			</div>
			<div className={styles.controlsControl} onClick={handleSortByNameClick}>
				<span>Sort by name</span>
				<SwapIcon direction={sortByNameDirection} />
			</div>
			<div
				className={styles.controlsControl}
				onClick={handleSortByPopulationClick}
			>
				<span>Sort by population</span>
				<SwapIcon direction={sortByPopulationDirection} />
			</div>
			<div className={styles.controlsControl}>
				<span>Region</span>
				<select onChange={handleRegionChange}>
					{regions.map((region) => (
						<option key={region} value={region}>
							{region}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};
