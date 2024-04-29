import React from 'react';
import { useTranslation } from 'react-i18next';
import FavoriteQuestions from '../../components/FavoriteQuestions/FavoriteQuestions';
import { useAppState } from '../../contexts/AppStateContext/AppStateContext';
import { routes } from '../../router/constants';

const Errors: React.FC = () => {
  const { t } = useTranslation();
  const { content } = useAppState();

  // TODO: add loading placeholder
  if (content.loading) {
    return <>loading</>;
  }

  return (
    <>
      {content.questions.length > 0 ? (
        <FavoriteQuestions questions={content.questions} title={t('errors')} prevLink={routes.home.path} />
      ) : (
        <p>Нет вопросов с неверными ответами</p>
      )}
    </>
  );
};

export default Errors;
