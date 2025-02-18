import { useEffect, useState } from 'react';

const useSearchQuery = (
  initialQuery: string = ''
): [string, (query: string) => void] => {
  const [searchQuery, setSearchQuery] = useState(
    () => localStorage.getItem('searchTerm') || initialQuery
  );

  useEffect(() => {
    localStorage.setItem('searchTerm', searchQuery);
  }, [searchQuery]);

  return [searchQuery, setSearchQuery];
};

export default useSearchQuery;
