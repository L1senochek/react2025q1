import { memo, useCallback } from 'react';
import { Country } from '@pages/main-page/api/types.ts';
import { useLocalStorage } from '@pages/main-page/hooks/use-local-storage.ts';
import classNames from 'classnames';

import styles from './country-card.module.scss';

interface Props {
	country: Country;
}

const CountryCard = ({ country }: Props) => {
	const [visitedCountries, setVisitedCountries] = useLocalStorage(
		'visitedCountries',
		'[]'
	);

	const visitedCountriesArray: string[] = JSON.parse(visitedCountries);

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
		<div
			className={classNames(
				styles.country,
				isVisited(country.name.common) ? styles.visited : ''
			)}
			onClick={() => handleCountryClick(country.name.common)}
		>
			<img
				className={styles.countryFlag}
				src={country.flags.png}
				alt={country.name.common}
			/>
			<h3 className={styles.countryName}>{country.name.common}</h3>
			<div className={styles.countryInfo}>
				<p className={styles.countryInfoItem}>
					Population:{' '}
					<span className={styles.countryInfoValue}>{country.population}</span>
				</p>
				<p className={styles.countryInfoItem}>
					Region:{' '}
					<span className={styles.countryInfoValue}>{country.region}</span>
				</p>
			</div>
		</div>
	);
};

export default memo(CountryCard);
