import { createContext } from 'react';

import IThemeContext from '@/model/ThemeContext.ts';

const ThemeContext = createContext<IThemeContext>({
  isLightMode: false,
  setLightMode: () => {},
});

export default ThemeContext;
