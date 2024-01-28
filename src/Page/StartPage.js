import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./StartPage.css";

function StartPage() {
  const [touch, setTouch] = useState(false);
  const getTouch = function () {
    setTouch(true);
  };
  let a = 1;
  const ScreenStyle = {
    width: "386px",
    height: "840px",
    margin: "0 auto",
    border: "1px solid black", // 경계를 확인하기 위한 임시 스타일
  };

  return (
    <div style={ScreenStyle} onClick={getTouch} className="container-row">
      {touch ? (
        <h1>
          <Navigate to="/category" />
        </h1>
      ) : (
        <>
          <div></div>
          <div></div>
          <div>
            <div className="Logo">
              <img
                src={`${process.env.PUBLIC_URL}/Imgs/BrandLogo.png`}
                className="Logo"
              />
            </div>
            <h3 className="Text">화면을 터치해 주세요!!</h3>
          </div>
          <div></div>
          <div className="container-col">
            <div></div>
            <div></div>
            <img
              src={`${process.env.PUBLIC_URL}/Imgs/Boonga.png`}
              className="Boong"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default StartPage;
