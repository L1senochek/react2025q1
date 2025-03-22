import { Country } from '@pages/main-page/api/types.ts';
import classNames from 'classnames';

import styles from './country-card.module.scss';

interface Props {
	country: Country;
	isVisited: boolean;
	onClick: (countryName: string) => void;
}

export const CountryCard = ({ country, isVisited, onClick }: Props) => {
	return (
		<div
			className={classNames(styles.country, isVisited ? styles.visited : '')}
			onClick={() => onClick(country.name.common)}
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
