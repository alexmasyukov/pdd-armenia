import React, { createContext, useContext, useEffect, useState } from 'react';
import { getShowRightAnswersLocalStorageFlag, setShowRightAnswersLocalStorageFlag } from './utils';

export interface Settings {
  showRightAnswers: boolean;
  changeShowRightAnswersFlag: () => void;
}

export const SettingsContext = createContext({} as Settings);

export const useSettings = () => useContext<Settings>(SettingsContext);

type ProviderProps = {
  children: React.ReactNode;
};

const SettingsProvider = ({ children }: ProviderProps) => {
  const [showRightAnswers, setShowRightAnswers] = useState(getShowRightAnswersLocalStorageFlag());

  const changeShowRightAnswersFlag = () => {
    setShowRightAnswers((prev) => !prev);
  };

  useEffect(() => {
    setShowRightAnswersLocalStorageFlag(showRightAnswers);
  }, [showRightAnswers]);

  return (
    <SettingsContext.Provider
      value={{
        showRightAnswers,
        changeShowRightAnswersFlag,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
