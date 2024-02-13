import React from "react";
import "./Message.css";

function Message({ message }) {
  return (
    // <div className="message-container">
    //   {messages.map((message, index) => (

    <div className="bubble">{message}</div>
    //   ))}
    // </div>
  );
}

export default Message;
