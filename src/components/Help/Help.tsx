import React, { useEffect, useState } from 'react';
import HelpForm from './HelpForm';
import { Question } from '../../types';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className='help-wrapper'>{children}</div>;
};

type Props = {
  questionId: Question['id'];
};

const Help = ({ questionId }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [hint, setHint] = useState('');

  const getQuestionHint = async (questionId: Question['id']) => {
    try {
      const response = await fetch(`http://localhost:9000/hint?id=${questionId}`);
      const { data, errors } = await response.json();
      if (response.ok) {
        if ('hint' in data) {
          setHint(data.hint);
        }
      } else {
        console.error(errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    getQuestionHint(questionId);
  }, [questionId]);

  if (isEdit) {
    return (
      <Wrapper>
        <HelpForm onSave={handleSave} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div dangerouslySetInnerHTML={{ __html: hint }} />
      <button onClick={() => setIsEdit(true)} className={`favorite-btn mt-10`}>
        Edit
      </button>
    </Wrapper>
  );
};

export default Help;
