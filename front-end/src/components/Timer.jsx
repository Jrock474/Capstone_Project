import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(3);
  const [monoState, setMonoState] = useState("/gifs/Dino_Still.gif");

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(interval) && setMonoState("/gifs/Dino_Still.gif");
    }
  }, [seconds]);

  return (
    <div>
      {/* <h3>Timer: {seconds} seconds</h3> */}
      <img src={monoState} alt="Dino" />
    </div>
  );
}

export default Timer;
