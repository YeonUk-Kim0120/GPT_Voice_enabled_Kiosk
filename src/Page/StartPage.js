import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./StartPage.css";

function StartPage() {
  const [touch, setTouch] = useState(false);
  const getTouch = function () {
    setTouch(true);
  };

  const ScreenStyle = {
    width: "370px",
    height: "824px",
    margin: "0 auto",
    border: "1px solid black", // 경계를 확인하기 위한 임시 스타일
  };

  return (
    <div style={ScreenStyle} onClick={getTouch}>
      {touch ? (
        <h1>
          <Navigate to="/category" />
        </h1>
      ) : (
        <div className="center-container">
          <img
            src="https://img.79plus.co.kr/megahp/common/img/bi_logo1.png"
            className="Logo"
          />
          <h3 className="Text">화면을 터치해 주세요!!</h3>
          <img
            src="https://play-lh.googleusercontent.com/bPWZ36dOPSgSo6XuvgBFe_8wvVzAysFgd6aETrMgELq29j0WuC3Hu5yP9l3tQPJ1cLw=w600-h300-pc0xffffff-pd"
            className="Boong"
          />
        </div>
      )}
    </div>
  );
}

export default StartPage;
