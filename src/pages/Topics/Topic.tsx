import React from 'react';
import { useParams } from 'react-router-dom';
import Questions from '../../components/Questions/Questions';
import { useAppState } from '../../contexts/AppStateContext/AppStateContext';
import { routes } from '../../router/constants';

const Topic = () => {
  const { id: topicId } = useParams<'id'>();
  const { content } = useAppState();

  const topicQuestions = content.questions.filter((question) => question.gid === topicId);
  const groupName = content.groups.find((group) => group.id === topicId)?.name;

  // TODO: add loading placeholder
  if (content.loading) {
    return <>loading</>;
  }

  return <Questions questions={topicQuestions} title={groupName} prevLink={routes.topics.path} />;
};

export default Topic;
