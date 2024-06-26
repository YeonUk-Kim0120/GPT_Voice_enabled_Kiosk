import React, { useState, useEffect } from "react";

function AudioRecord() {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [disabled, setDisabled] = useState(true);
  const [audioURL, setAudioURL] = useState("");

  const onRecAudio = () => {
    setDisabled(true);

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
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

  const offRecAudio = () => {
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
      //handleSubmit(e.data);
    };

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();

    analyser.disconnect();
    source.disconnect();

    if (audioUrl) {
      URL.createObjectURL(audioUrl);
    }

    const sound = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });

    setDisabled(false);
    console.log(sound);
  };

  const play = () => {
    const audio = new Audio(URL.createObjectURL(audioUrl));
    audio.loop = false;
    audio.volume = 1;
    audio.play();
  };

  const handleSubmit = async (blobData) => {
    try {
      const formData = new FormData();
      formData.append("audio", blobData, "recordedAudio.wav");
      console.log(formData, typeof formData);
      const response = await fetch("https://bongabang.shop/api/cafe/v1/stt/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json(); // 텍스트 데이터를 JSON 형식으로 파싱
        console.log("Transcribed text:", data.transcripts); // 텍스트 데이터 출력

        // 챗봇 엔드포인트로 텍스트 데이터를 전송
        const chatResponse = await fetch(
          "https://bongabang.shop/api/cafe/v1/chatgpt/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              response: data.transcripts[0],
            }),
          }
        );

        if (chatResponse.ok) {
          console.log("Text submitted to chatbot successfully!");
          const data_1 = await chatResponse.json();
          setAudioURL(data_1.audio_url);
        } else {
          console.error(
            "Error submitting text to chatbot:",
            chatResponse.statusText
          );
        }
      } else {
        console.error("Error submitting audio file:", response.statusText);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    fetchAudioURLFromServer(audioURL);
    if (audioURL) {
      const audio = new Audio(audioURL);
      audio.play();

      return () => {
        audio.pause();
        audio = null;
      };
    }
  }, [audioURL]);

  async function fetchAudioURLFromServer(audio_url) {
    try {
      const response = await fetch(audio_url); // 오디오 URL을 반환하는 서버의 엔드포인트
      const { url } = await response.json();
      setAudioURL(url);
    } catch (error) {
      console.error("Error fetching audio URL: ", error);
    }
  }

  return (
    <>
      <button onClick={onRec ? onRecAudio : offRecAudio}>녹음</button>
      <button onClick={play} disabled={disabled}>
        재생
      </button>
      <button onClick={() => handleSubmit(audioUrl)} disabled={!audioUrl}>
        Submit
      </button>
    </>
  );
}

export default AudioRecord;
