import React, { PropsWithChildren } from 'react';

import { FavouritesProvider } from '../../providers/FavouritesProvider';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { SearchBar } from '../SearchBar';
import { ThemeToggle } from '../ThemeToggle';

import styles from '../../pages/MainPage/main-page.module.scss';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <header className={styles['top-section']}>
        <div className={styles['top-section_controls']}>
          <SearchBar />
          <ThemeToggle />
        </div>
      </header>
      <main className={styles['middle-section']}>
        <FavouritesProvider>{children}</FavouritesProvider>
      </main>
    </ThemeProvider>
  );
};

export default Layout;
