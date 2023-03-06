import React, { useState, useEffect, useRef } from "react";
import "./button.css";

function Button({ children }) {
  const reflectionRef = useRef(null);
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    if (!reflectionRef.current) return;
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    })
    .then((stream) => {
        const video = reflectionRef.current;
        video.srcObject = stream;
        video.onloadedmetadata = () => {
        video.play();
        };
    })
    .catch((e) => console.log(e));
  }, [reflectionRef]);

  return (
    <div
      className={`button-wrap ${buttonPressed ? "pressed" : null}`}
    >
      <div
        className={`button ${buttonPressed ? "pressed" : null}`}
        onPointerDown={() => setButtonPressed(true)}
        onPointerUp={() => setButtonPressed(false)}
      >
        <video
          className="button-reflection"
          ref={reflectionRef}
        />
      </div>
      <div className="text">{children}</div>
    </div>
  );
}

export default Button;