import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initialState: string = '') => {
	const getFromLocalStorage = useCallback(() => {
		const data = localStorage.getItem(key);
		return data || initialState;
	}, [initialState, key]);

	const [ls, setLS] = useState<string>(getFromLocalStorage);

	useEffect(() => {
		localStorage.setItem(key, ls);
	}, [key, ls]);

	return [ls, setLS] as const;
};
