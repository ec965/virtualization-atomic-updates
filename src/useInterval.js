import React from 'react';

export function useInterval(callback, delay = 1000){
  const interval = React.useRef(null);

  React.useEffect(() => {
    if (interval.current === null) {
      interval.current = setInterval(callback , delay);
    }
  }, []);

  return interval.current;
}
