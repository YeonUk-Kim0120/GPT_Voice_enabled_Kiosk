// // TestPage.js
import React, { useState } from "react";
import { saveAs } from "file-saver";
import { ReactMic } from "react-mic";

function QueryComponent() {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [disabled, setDisabled] = useState(true); // 😀😀😀

  const onRecAudio = () => {
    setDisabled(true); // 😀😀😀

    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지 했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();

    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();

    if (audioUrl) {
      URL.createObjectURL(audioUrl); // 출력된 링크에서 녹음된 오디오 확인 가능
    }

    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });

    // 😀😀😀
    setDisabled(false);
    console.log(sound); // File 정보 출력
  };

  const play = () => {
    const audio = new Audio(URL.createObjectURL(audioUrl)); // 😀😀😀
    audio.loop = false;
    audio.volume = 1;
    audio.play();
  };

  // 😀😀😀
  return (
    <>
      <button onClick={onRec ? onRecAudio : offRecAudio}>녹음</button>
      <button onClick={play} disabled={disabled}>
        재생
      </button>
    </>
  );
}
//   // // const [isRecording, setIsRecording] = useState(false);
//   // // const [isPlaying, setIsPlaying] = useState(false);
//   // // const [blobObject, setBlobObject] = useState(null);

//   // // const startRecording = () => {
//   // //   setIsRecording(true);
//   // // };

//   // // const stopRecording = () => {
//   // //   setIsRecording(false);
//   // // };

//   // // const onData = (recordedBlob) => {
//   // //   console.log("chunk of real-time data is: ", recordedBlob);
//   // // };

//   // // const onStop = (recordedBlob) => {
//   // //   console.log("recordedBlob is: ", recordedBlob);
//   // //   setBlobObject(recordedBlob);
//   // // };

//   // // const handleSave = () => {
//   // //   if (blobObject) {
//   // //     saveAs(blobObject.blob, "recordedAudio.wav");
//   // //   }
//   // // };

//   // // const handlePlay = () => {
//   // //   const audio = new Audio(blobObject.blobURL);
//   // //   audio.play();
//   // //   setIsPlaying(true);
//   // //   audio.addEventListener("ended", () => {
//   // //     setIsPlaying(false);
//   // //   });
//   // // };

//   // // const handleSubmit = async () => {
//   // //   try {
//   // //     const formData = new FormData();
//   // //     formData.append("audio", blobObject.blob, "recordedAudio.wav");

//   // //     const response = await fetch("https://bongabang.shop/api/cafe/v1/stt/", {
//   // //       method: "POST",
//   // //       body: formData,
//   // //     });

//   // //     if (response.ok) {
//   // //       const { text } = await response.json(); // 반환된 텍스트 가져오기
//   // //       //await sendTextToChatGPT(text);
//   // //       console.log("Audio file submitted successfully!");
//   // //     } else {
//   // //       console.error("Error submitting audio file:", response.statusText);
//   // //     }
//   // //   } catch (error) {
//   // //     console.error("Error submitting audio file:", error);
//   // //   }
//   // };

//   //   const sendTextToChatGPT = async (text) => {
//   //     try {
//   //         const response = await fetch("https://bongabang.shop/api/cafe/v1/chatgpt/", {
//   //             method: "POST",
//   //             headers: {
//   //                 "Content-Type": "application/json"
//   //             },
//   //             body: JSON.stringify({ text: text })
//   //         });

//   //         if (response.ok) {
//   //             console.log("Text submitted to ChatGPT successfully!");
//   //         } else {
//   //             console.error("Error submitting text to ChatGPT:", response.statusText);
//   //         }
//   //     } catch (error) {
//   //         console.error("Error submitting text to ChatGPT:", error);
//   //     }
//   // };
//   return (
//     <div>
//       <ReactMic
//         record={isRecording}
//         onStop={onStop}
//         onData={onData}
//         mimeType="audio/wav"
//       />
//       <button onClick={startRecording} disabled={isRecording}>
//         Start
//       </button>
//       <button onClick={stopRecording} disabled={!isRecording}>
//         Stop
//       </button>
//       <button onClick={handleSave} disabled={!blobObject}>
//         Save
//       </button>
//       <button onClick={handlePlay} disabled={!blobObject || isPlaying}>
//         Play
//       </button>
//       <button onClick={handleSubmit} disabled={!blobObject}>
//         Submit
//       </button>
//     </div>
//   );
// }

export default QueryComponent;

// import React, { useState, useEffect, useRef } from "react";

// function QueryComponent() {
//   const [history, setHistory] = useState([]);
//   const [prompt, setPrompt] = useState("");
//   const [recording, setRecording] = useState(false); // recording 상태 추가
//   const [audioBlob, setAudioBlob] = useState(null); // 오디오 Blob 상태 추가
//   const lastAudioDetectedTime = useRef(null); // useRef로 변경

//   const promptRef = useRef(null);
//   const audioRef = useRef(null); // 오디오 요소에 접근하기 위한 useRef

//   useEffect(() => {
//     startListening();
//   }, []);

//   async function startRecording(stream) {
//     try {
//       const recorder = new MediaRecorder(stream);
//       const chunks = [];

//       recorder.ondataavailable = (event) => {
//         chunks.push(event.data);
//       };

//       recorder.onstop = async () => {
//         try {
//           const blob = new Blob(chunks, { type: "audio/wav" });
//           setAudioBlob(blob); // 녹음이 끝나면 Blob을 상태로 설정
//         } catch (error) {
//           console.error("Error creating Blob:", error);
//         }
//       };

//       if (recording) {
//         // 녹음 중인 경우 녹음을 중지하고 recording 상태를 false로 변경
//         recorder.stop();
//         setRecording(false);
//       } else {
//         // 녹음 중이 아닌 경우 녹음을 시작하고 recording 상태를 true로 변경
//         recorder.start();
//         setRecording(true);
//       }
//     } catch (error) {
//       console.error("Error starting recording:", error);
//     }
//   }

//   async function startListening() {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//       const audioContext = new AudioContext();
//       const source = audioContext.createMediaStreamSource(stream);
//       const processor = audioContext.createScriptProcessor(1024, 1, 1);

//       processor.onaudioprocess = function (event) {
//         const inputData = event.inputBuffer.getChannelData(0);
//         const bufferLength = inputData.length;
//         let sum = 0;
//         for (let i = 0; i < bufferLength; i++) {
//           sum += Math.abs(inputData[i]);
//         }
//         const average = sum / bufferLength;
//         if (average > 0.01 && !recording) {
//           startRecording(stream);
//         } else if (average <= 0.01 && recording) {
//           lastAudioDetectedTime.current = Date.now();
//           startRecording(stream); // 녹음 종료 시 recording 상태를 false로 변경하지 않고 다시 녹음 시작
//         }
//       };

//       source.connect(processor);
//       processor.connect(audioContext.destination);
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//     }
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();

//     const dateTime = new Date();
//     const time = dateTime.toLocaleTimeString();

//     setHistory((prevHistory) => [...prevHistory, { user: prompt, time }]);
//     setPrompt("");
//     promptRef.current.value = "";

//     try {
//       // Fetch 로직...
//       console.log();
//     } catch (error) {
//       console.error("Error in fetch:", error);
//     }
//   }

//   function handlePlay() {
//     if (audioBlob) {
//       const audioUrl = URL.createObjectURL(audioBlob);
//       audioRef.current.src = audioUrl;
//       audioRef.current.play();
//     }
//   }

//   return (
//     <div className="container p-3">
//       <h3>ChatGPT Clone</h3>
//       <p>
//         Press and hold the spacebar to record audio. Release the spacebar to
//         stop recording.
//       </p>

//       <div className="chat-container" id="response">
//         {history.map((entry, index) => (
//           <div
//             key={index}
//             className={`chat-message ${
//               entry.user ? "user-message" : "bot-message"
//             }`}
//           >
//             {entry.user ? entry.user : entry.bot}
//           </div>
//         ))}
//       </div>

//       <div className="chat-input">
//         <form onSubmit={handleSubmit} className="d-flex align-items-center">
//           <div className="flex-grow-1 me-2">
//             <label htmlFor="prompt" className="form-label">
//               Prompt:
//             </label>
//             <textarea
//               className="form-control"
//               id="prompt"
//               name="prompt"
//               rows="3"
//               ref={promptRef}
//               onChange={(event) => setPrompt(event.target.value)}
//             ></textarea>
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//           <button onClick={handlePlay} className="btn btn-success ms-2">
//             Play
//           </button>
//           <button onClick={startRecording} className="btn btn-warning ms-2">
//             {recording ? "Stop Recording" : "Record"}
//           </button>
//         </form>
//       </div>

//       {/* 오디오 플레이어 */}
//       {audioBlob && (
//         <audio ref={audioRef} controls style={{ display: "none" }}>
//           <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
//           Your browser does not support the audio element.
//         </audio>
//       )}
//     </div>
//   );
// }

// export default QueryComponent;
