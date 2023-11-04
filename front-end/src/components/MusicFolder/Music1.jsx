import React, { useEffect, useRef } from "react";
//MAINGAME OST
function Music1() {
  const audioRef = useRef(null);
  const volume = 0.7; 

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div>
      <audio ref={audioRef} autoPlay loop>
        <source src="./music/Kaizo.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}

export default Music1;
