import React, {
  PropsWithChildren,
  ReactElement,
  memo,
  useEffect,
  useState,
} from 'react';

import ThemeContext from '@/providers/ThemeProvider/ThemeContext.ts';

const ThemeProvider: React.FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const [isLightMode, setIsLightMode] = useState<boolean>(false);

  const setLightMode = () => {
    setIsLightMode(!isLightMode);
  };

  useEffect(() => {
    document.documentElement.setAttribute('theme', isLightMode ? 'light' : '');
  }, [isLightMode]);

  return (
    <ThemeContext.Provider value={{ isLightMode, setLightMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default memo(ThemeProvider);
