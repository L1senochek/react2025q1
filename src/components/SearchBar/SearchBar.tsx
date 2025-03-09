'use client';

import React, {
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  memo,
  useCallback,
  useState,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import styles from './searchbar.module.scss';

const SearchBar: React.FC = (): ReactElement => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get('query') || ''
  );
  const router = useRouter();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      event.preventDefault();
      setSearchTerm(event.target.value);
    },
    []
  );

  const onSearchSubmit = useCallback(() => {
    const params = new URLSearchParams();
    params.set('query', searchTerm);
    params.set('page', '1');
    router.push(`/main?${params.toString()}`);
  }, [searchTerm, router]);

  const handleSubmit = useCallback(
    (event: KeyboardEvent<HTMLInputElement> | React.FormEvent): void => {
      event.preventDefault();
      onSearchSubmit();
    },
    [onSearchSubmit]
  );

  const handleInputFocus = (): void => setIsFocused(!isFocused);
  const handleButtonHover = (): void => setIsHovered(!isHovered);

  return (
    <form
      role="search"
      className={`${styles['search-bar']} ${isFocused ? styles.focused : ''} ${isHovered ? styles.hovered : ''}`}
      onSubmit={handleSubmit}
      onFocus={handleInputFocus}
      onBlur={handleInputFocus}
      onMouseEnter={handleButtonHover}
      onMouseLeave={handleButtonHover}
    >
      <input
        className={styles['search-bar__input']}
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search characters..."
      />
      <button className={styles['search-bar__input']} type="submit">
        Search
      </button>
    </form>
  );
};

export default memo(SearchBar);
