import { useCallback, useEffect, useState } from 'react';
import { fetchCountries } from '@pages/main-page/api/fetchCountries.ts';
import { Country } from '@pages/main-page/api/types.ts';

export const useFetchCountries = () => {
	const [countries, setCountries] = useState<Country[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>('');

	const fetchCountryList = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await fetchCountries();

			if (!response.ok) {
				setCountries([]);
			}

			const data: Country[] = await response.json();
			setCountries(data);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else setError('Unknown error');
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCountryList().then(() => {});
	}, [fetchCountryList]);

	return { countries, isLoading, error } as const;
};
