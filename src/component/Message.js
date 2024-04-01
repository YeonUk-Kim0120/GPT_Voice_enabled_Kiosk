import React, { useState, useEffect } from "react";
import "./Message.css";

function Message({ message }) {
  const [displayMessage, setDisplayMessage] = useState("");

  useEffect(() => {
    setDisplayMessage("");
    let index = 0;
    const timer = setInterval(() => {
      setDisplayMessage((prevMessage) => prevMessage + message.charAt(index));
      index++;
      if (index > message.length) {
        clearInterval(timer);
      }
    }, 100); // 여기서 100은 각 글자가 출력되는 시간 간격입니다. 원하는 대로 조절하실 수 있습니다.
    return () => clearInterval(timer);
  }, [message]);

  return <div className="bubble">{displayMessage}</div>;
}

export default Message;
