import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import useLocalStorage from '@/hooks/useLocalStorage.tsx';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [curPage] = useLocalStorage('currentPage');
  const [lsSearchTerm] = useLocalStorage('searchTerm');
  const [searchTerm] = useState(
    searchParams.get('query') || lsSearchTerm || ''
  );
  const navigate = useNavigate();
  const currentPage = useMemo(() => {
    return parseInt(searchParams.get('page') || curPage || '1', 10);
  }, [curPage, searchParams]);

  useEffect(() => {
    if (!searchParams.toString()) {
      if (searchTerm) searchParams.set('query', searchTerm);
      searchParams.set('page', currentPage.toString());
      navigate(`/main?${searchParams.toString()}`);
    }
  }, [currentPage, navigate, searchParams, searchTerm, setSearchParams]);
};

export default Index;
