// TestPage.js

import React, { useState, useEffect, useRef } from "react";

function QueryComponent() {
  const [history, setHistory] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [recording, setRecording] = useState(false); // recording 상태 추가
  const [audioBlob, setAudioBlob] = useState(null); // 오디오 Blob 상태 추가
  const lastAudioDetectedTime = useRef(null); // useRef로 변경

  const promptRef = useRef(null);
  const audioRef = useRef(null); // 오디오 요소에 접근하기 위한 useRef

  useEffect(() => {
    startListening();
  }, []);

  async function startRecording(stream) {
    try {
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = async () => {
        try {
          const blob = new Blob(chunks, { type: "audio/wav" });
          setAudioBlob(blob); // 녹음이 끝나면 Blob을 상태로 설정
        } catch (error) {
          console.error("Error creating Blob:", error);
        }
      };

      if (recording) {
        // 녹음 중인 경우 녹음을 중지하고 recording 상태를 false로 변경
        recorder.stop();
        setRecording(false);
      } else {
        // 녹음 중이 아닌 경우 녹음을 시작하고 recording 상태를 true로 변경
        recorder.start();
        setRecording(true);
      }
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  }

  async function startListening() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(1024, 1, 1);

      processor.onaudioprocess = function (event) {
        const inputData = event.inputBuffer.getChannelData(0);
        const bufferLength = inputData.length;
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += Math.abs(inputData[i]);
        }
        const average = sum / bufferLength;
        if (average > 0.01 && !recording) {
          startRecording(stream);
        } else if (average <= 0.01 && recording) {
          lastAudioDetectedTime.current = Date.now();
          startRecording(stream); // 녹음 종료 시 recording 상태를 false로 변경하지 않고 다시 녹음 시작
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const dateTime = new Date();
    const time = dateTime.toLocaleTimeString();

    setHistory((prevHistory) => [...prevHistory, { user: prompt, time }]);
    setPrompt("");
    promptRef.current.value = "";

    try {
      // Fetch 로직...
      console.log();
    } catch (error) {
      console.error("Error in fetch:", error);
    }
  }

  function handlePlay() {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  }

  return (
    <div className="container p-3">
      <h3>ChatGPT Clone</h3>
      <p>
        Press and hold the spacebar to record audio. Release the spacebar to
        stop recording.
      </p>

      <div className="chat-container" id="response">
        {history.map((entry, index) => (
          <div
            key={index}
            className={`chat-message ${
              entry.user ? "user-message" : "bot-message"
            }`}
          >
            {entry.user ? entry.user : entry.bot}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <form onSubmit={handleSubmit} className="d-flex align-items-center">
          <div className="flex-grow-1 me-2">
            <label htmlFor="prompt" className="form-label">
              Prompt:
            </label>
            <textarea
              className="form-control"
              id="prompt"
              name="prompt"
              rows="3"
              ref={promptRef}
              onChange={(event) => setPrompt(event.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button onClick={handlePlay} className="btn btn-success ms-2">
            Play
          </button>
          <button onClick={startRecording} className="btn btn-warning ms-2">
            {recording ? "Stop Recording" : "Record"}
          </button>
        </form>
      </div>

      {/* 오디오 플레이어 */}
      {audioBlob && (
        <audio ref={audioRef} controls style={{ display: "none" }}>
          <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

export default QueryComponent;
