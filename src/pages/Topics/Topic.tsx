import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Questions from '../../components/Questions/Questions';
import { getEmptyBaseData } from '../../helpers';
import { BaseData } from '../../types';

const Topic: React.FC = () => {
  const { id: topicId } = useParams<'id'>();
  const [data, setData] = useState<BaseData>(getEmptyBaseData());
  const [loading, setLoading] = useState<boolean>(true);
  const topicQuestions = data.questions.filter((question) => question.gid === topicId);

  useEffect(() => {
    import('././../../data/ru.json').then((data) => {
      setData(data as BaseData);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <>Loaing</>
  ) : (
    <>
      <Questions questions={topicQuestions} />
    </>
  );
};

export default Topic;
