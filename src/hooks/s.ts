import { useState } from 'react';

export const useCleaned = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setTimestamp] = useState(Date.now());

  const handleOnCleaned = () => {
    setTimestamp(Date.now());
  };

  return {
    onCleaned: handleOnCleaned,
  };
};
