import React, { useState, useEffect } from "react";
import "./Message.css";

function Message({ message }) {
  const [displayMessage, setDisplayMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < message.length) {
      const timer = setTimeout(() => {
        setDisplayMessage((prevMessage) => prevMessage + message[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 120); // 1초마다 한 글자씩 출력

      return () => clearTimeout(timer);
    }
  }, [currentIndex, message]);

  return <div className="bubble">{displayMessage}</div>;
}

export default Message;
