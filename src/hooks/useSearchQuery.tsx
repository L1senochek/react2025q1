import { useCallback, useEffect, useState } from 'react';

const useSearchQuery = (
  key: string,
  initialQuery: string = ''
): [string, (query: string) => void] => {
  const setQuery = useCallback(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || initialQuery;
    }
    return initialQuery;
  }, [key, initialQuery]);

  const [searchQuery, setSearchQuery] = useState(setQuery());

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem(key, searchQuery);
  }, [searchQuery, key]);

  return [searchQuery, setSearchQuery];
};

export default useSearchQuery;
