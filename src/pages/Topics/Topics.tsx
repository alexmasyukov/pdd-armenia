import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEmptyBaseData } from '../../helpers';
import { routes } from '../../router/constants';
import { BaseData } from '../../types';

const Topics: React.FC = () => {
  const [data, setData] = useState<BaseData>(getEmptyBaseData());
  const [loading, setLoading] = useState<boolean>(true);

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
      <ul>
        {data.groups.map((group) => (
          <li>
            <Link to={routes.topics.topicById.view(group.id)}>{group.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Topics;
