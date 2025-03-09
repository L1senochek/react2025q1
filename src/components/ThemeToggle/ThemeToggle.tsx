import React, { ReactElement, memo, useContext } from 'react';

import ThemeContext from '../../providers/ThemeProvider/ThemeContext.ts';

import styles from './theme-toggle.module.scss';

const ThemeToggle: React.FC = (): ReactElement => {
  const { isLightMode, setLightMode } = useContext(ThemeContext);

  const handleChange = () => {
    setLightMode();
  };

  return (
    <>
      <input
        type={'checkbox'}
        name={'theme-toggle'}
        className={`${styles['theme-toggle']} ${isLightMode ? styles['light'] : ''}`}
        onChange={handleChange}
      />
    </>
  );
};

export default memo(ThemeToggle);
