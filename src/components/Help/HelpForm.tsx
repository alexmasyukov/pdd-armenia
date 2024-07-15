import React from 'react';

type Props = {
  onSave: () => void;
};

const HelpForm = ({ onSave }: Props) => {
  return (
    <>
      <h1>Help Form</h1>
      <button onClick={onSave} className={`favorite-btn`}>
        Save
      </button>
    </>
  );
};

export default HelpForm;
