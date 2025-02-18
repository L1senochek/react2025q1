import React, {
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  memo,
  useCallback,
  useState,
} from 'react';

import styles from './searchbar.module.scss';

import ISearchBarProps from '@/model/SearchBar';

const SearchBar: React.FC<ISearchBarProps> = ({
  searchTerm,
  onInputChange,
  onSearchSubmit,
}): ReactElement => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      event.preventDefault();
      onInputChange(event.target.value);
    },
    [onInputChange]
  );

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
