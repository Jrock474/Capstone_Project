import React, { useEffect, useRef, useState } from "react";
//useRef accesses the Dom element
function Music1() {
  const audioRef = useRef(null);
  const volume = 0.7;
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume; //If isMuted is true volume will equal 0 by conditional rendering
    }
  }, [isMuted, volume]);

  const toggleMute = () => {
    setIsMuted((Muted) => !Muted);
  };

  return (
    <div>
      <audio ref={audioRef} autoPlay loop>
        <source src="./music/Kaizo.mp3" type="audio/mp3" />
      </audio>
      <img
        onClick={toggleMute} className="volume"
        src={isMuted ? "./notmuted.png" : "./muted.png"}
        alt={"volume button"}
      />
    </div>
  );
}

export default Music1;


