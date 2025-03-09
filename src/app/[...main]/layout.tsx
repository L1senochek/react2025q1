import React, { PropsWithChildren } from 'react';

import { SearchBar } from '../../components/SearchBar';
import { ThemeToggle } from '../../components/ThemeToggle';
import { FavouritesProvider } from '../../providers/FavouritesProvider';
import { ThemeProvider } from '../../providers/ThemeProvider';

import styles from '../../pages/MainPage/main-page.module.scss';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <FavouritesProvider>
        <header className={styles['top-section']}>
          <div className={styles['top-section_controls']}>
            <SearchBar />
            <ThemeToggle />
          </div>
        </header>
        <main className={styles['middle-section']}>{children}</main>
      </FavouritesProvider>
    </ThemeProvider>
  );
};

export default Layout;
