import { useState } from 'react';
import { Country } from '@pages/main-page/api/types.ts';
import { useLocalStorage } from '@pages/main-page/hooks/use-local-storage.ts';
import { Controls } from '@pages/main-page/ui/controls.tsx';
import { CountryCard } from '@pages/main-page/ui/country-card.tsx';

import styles from './country-list.module.scss';

interface Props {
	countries: Country[];
}

enum SORT_DIRECTIONS {
	'asc' = 1,
	'desc' = -1,
	'' = 0,
}

export type SortDirection = keyof typeof SORT_DIRECTIONS;

export const CountryList = ({ countries }: Props) => {
	const [visitedCountries, setVisitedCountries] = useLocalStorage(
		'visitedCountries',
		'[]'
	);

	const visitedCountriesArray: string[] = JSON.parse(visitedCountries);

	const regions = [
		'All',
		...Array.from(new Set(countries.map((country) => country.region))),
	];

	type Region = (typeof regions)[number];

	const [query, setQuery] = useState('');
	const [sortByNameDirection, setSortByNameDirection] =
		useState<SortDirection>('');
	const [sortByPopulationDirection, setSortByPopulationDirection] =
		useState<SortDirection>('');
	const [region, setRegion] = useState<Region>(regions[0]);

	const filterCountriesByName = (countriesArray: Country[]) => {
		if (!query) return countriesArray;
		return countriesArray.filter((country) =>
			country.name.common.toLowerCase().includes(query.toLowerCase())
		);
	};

	const sortCountriesByName = (countriesArray: Country[]) => {
		if (sortByNameDirection === '') return countriesArray;
		return countriesArray.sort((a, b) => {
			if (a.name.common > b.name.common)
				return 1 * SORT_DIRECTIONS[sortByNameDirection];
			else if (a.name.common < b.name.common)
				return -1 * SORT_DIRECTIONS[sortByNameDirection];
			else return 0;
		});
	};

	const sortCountriesByPopulation = (countriesArray: Country[]) => {
		if (sortByPopulationDirection === '') return countriesArray;
		return countriesArray.sort(
			(a, b) =>
				(a.population - b.population) *
				SORT_DIRECTIONS[sortByPopulationDirection]
		);
	};

	const filterByRegion = (countriesArray: Country[]) => {
		if (region === 'All') return countriesArray;
		return countriesArray.filter((country) => country.region === region);
	};

	const preparedCountriesArray = () => {
		const filteredCountriesByName = filterCountriesByName([...countries]);
		const sortedCountriesByName = sortCountriesByName(filteredCountriesByName);
		const sortedCountriesByPopulation = sortCountriesByPopulation(
			sortedCountriesByName
		);
		return filterByRegion(sortedCountriesByPopulation);
	};

	const isVisited = (countryName: string) => {
		if (!visitedCountriesArray.length) return false;
		return visitedCountriesArray.includes(countryName);
	};

	const handleCountryClick = (countryName: string) => {
		if (isVisited(countryName)) {
			setVisitedCountries(
				JSON.stringify(
					visitedCountriesArray.filter((country) => country !== countryName)
				)
			);
		} else {
			visitedCountriesArray.push(countryName);
			setVisitedCountries(JSON.stringify(visitedCountriesArray));
		}
	};

	return (
		<>
			<Controls
				setQuery={setQuery}
				sortByNameDirection={sortByNameDirection}
				setSortByNameDirection={setSortByNameDirection}
				sortByPopulationDirection={sortByPopulationDirection}
				setSortByPopulationDirection={setSortByPopulationDirection}
				regions={regions}
				setRegion={setRegion}
			/>
			<div className={styles.countryList}>
				{preparedCountriesArray().map((country) => (
					<CountryCard
						key={country.name.common}
						country={country}
						isVisited={isVisited(country.name.common)}
						onClick={handleCountryClick}
					/>
				))}
			</div>
		</>
	);
};
