import { memo, useCallback, useMemo, useState } from 'react';
import { Country } from '@pages/main-page/api/types.ts';
import { useLocalStorage } from '@pages/main-page/hooks/use-local-storage.ts';
import { Controls } from '@pages/main-page/ui/controls.tsx';
import CountryCard from '@pages/main-page/ui/country-card.tsx';

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

const CountryList = ({ countries }: Props) => {
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

	const filterCountriesByName = useCallback(
		(countriesArray: Country[]) => {
			if (!query) return countriesArray;
			return countriesArray.filter((country) =>
				country.name.common.toLowerCase().includes(query.toLowerCase())
			);
		},
		[query]
	);

	const sortCountriesByName = useCallback(
		(countriesArray: Country[]) => {
			if (sortByNameDirection === '') return countriesArray;
			return countriesArray.sort((a, b) => {
				if (a.name.common > b.name.common)
					return 1 * SORT_DIRECTIONS[sortByNameDirection];
				else if (a.name.common < b.name.common)
					return -1 * SORT_DIRECTIONS[sortByNameDirection];
				else return 0;
			});
		},
		[sortByNameDirection]
	);

	const sortCountriesByPopulation = useCallback(
		(countriesArray: Country[]) => {
			if (sortByPopulationDirection === '') return countriesArray;
			return countriesArray.sort(
				(a, b) =>
					(a.population - b.population) *
					SORT_DIRECTIONS[sortByPopulationDirection]
			);
		},
		[sortByPopulationDirection]
	);

	const filterByRegion = useCallback(
		(countriesArray: Country[]) => {
			if (region === 'All') return countriesArray;
			return countriesArray.filter((country) => country.region === region);
		},
		[region]
	);

	const preparedCountriesArray = useMemo(() => {
		const filteredCountriesByName = filterCountriesByName([...countries]);
		const sortedCountriesByName = sortCountriesByName(filteredCountriesByName);
		const sortedCountriesByPopulation = sortCountriesByPopulation(
			sortedCountriesByName
		);
		return filterByRegion(sortedCountriesByPopulation);
	}, [
		countries,
		filterByRegion,
		filterCountriesByName,
		sortCountriesByName,
		sortCountriesByPopulation,
	]);

	const isVisited = useCallback(
		(countryName: string) => {
			if (!visitedCountriesArray.length) return false;
			return visitedCountriesArray.includes(countryName);
		},
		[visitedCountriesArray]
	);

	const handleCountryClick = useCallback(
		(countryName: string) => {
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
		},
		[isVisited, setVisitedCountries, visitedCountriesArray]
	);

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
				{preparedCountriesArray.map((country) => (
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

export default memo(CountryList);
