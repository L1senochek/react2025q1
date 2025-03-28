import { useFetchCountries } from '@pages/main-page/hooks/use-fetch-countries.ts';
import CountryList from '@pages/main-page/ui/country-list.tsx';

import styles from './main-page.module.scss';

export const MainPage = () => {
	const { countries, isLoading, error } = useFetchCountries();

	const content = () => {
		if (isLoading) return <p className={styles.loading}>Loading...</p>;
		if (error) return <p className={styles.error}>{error}</p>;
		if (!error && countries.length)
			return <CountryList countries={countries} />;
	};

	return (
		<div className={styles.page}>
			<h2 className={styles.pageHeading}>Countries</h2>
			<div className={styles.pageContent}>{content()}</div>
		</div>
	);
};
