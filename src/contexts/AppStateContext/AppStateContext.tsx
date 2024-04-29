import React, { createContext, useContext, useEffect, useState } from 'react';
import { getShowRightAnswersLocalStorageFlag, setShowRightAnswersLocalStorageFlag } from './utils';
import { BaseData } from '../../types';
import { getEmptyBaseData } from '../../helpers';

type Content = {
  loading: boolean;
  groups: BaseData['groups'];
  questions: BaseData['questions'];
};

export interface AppState {
  showRightAnswers: boolean;
  changeShowRightAnswersFlag: () => void;
  content: Content;
}

export const AppStateContext = createContext({} as AppState);

export const useAppState = () => useContext<AppState>(AppStateContext);

type ProviderProps = {
  children: React.ReactNode;
};

const AppStateProvider = ({ children }: ProviderProps) => {
  const [showRightAnswers, setShowRightAnswers] = useState(getShowRightAnswersLocalStorageFlag());

  const [content, setContent] = useState({
    loading: true,
    ...getEmptyBaseData(),
  });

  const changeShowRightAnswersFlag = () => {
    setShowRightAnswers((prev) => !prev);
  };

  useEffect(() => {
    setShowRightAnswersLocalStorageFlag(showRightAnswers);
  }, [showRightAnswers]);

  // load content (questions, groups)
  useEffect(() => {
    setTimeout(() => {
      import('././../../data/ru.json').then((data) => {
        setContent({
          loading: false,
          groups: data.groups as BaseData['groups'],
          questions: data.questions as BaseData['questions'],
        });
      });
    }, 1000);
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        showRightAnswers,
        changeShowRightAnswersFlag,
        content,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
