import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import { changeThemeBodyClass, getThemeFromLocalStorage, setThemeToLocalStorage } from './utils';

export type Theme = 'light' | 'dark';

export interface AppSettings {
  theme: Theme;
  toggleTheme: () => void;
}
export const AppSettingsContext = createContext({} as AppSettings);

export const useAppSettings = () => useContext<AppSettings>(AppSettingsContext);

type ProviderProps = {
  children: React.ReactNode;
};

const AppSettingsProvider = ({ children }: ProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getThemeFromLocalStorage());

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  useEffect(() => {
    console.log('theme:', theme);
    setThemeToLocalStorage(theme);
    changeThemeBodyClass(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <AppSettingsContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <ThemeProvider theme={muiTheme}>
        {/* <CssBaseline /> */}
        {children}
      </ThemeProvider>
    </AppSettingsContext.Provider>
  );
};

export default AppSettingsProvider;
