// App.js
import React, { useState } from 'react';
import BackButton from './BackButton';
import './App.css';
import Call from './Call';
import Pay from './Pay';
import Payment from './Payment';

function App() {
  const [modal, setModal] = useState(false);
  const [selectedNum, setSelectedNum] = useState(null);
  const [option, setOption] = useState(false);

  const showOption = () => {
    setOption(true);
  };

  const showModal = (num) => {
    setSelectedNum(num);
    setModal(true);
  };

  return (
    <div className="App">
      <div className="nav">
        <BackButton />
        <img
          src={`${process.env.PUBLIC_URL}/Imgs/logo.png`}
          alt="카페 로고"
          className="logo"
        />
      </div>
      <h1 className="payment">결제하기</h1>
      <div className="paymentRow">
        <div>
          <Payment
            method={'카드 결제'}
            imgSrc={`${process.env.PUBLIC_URL}/Imgs/card.svg`}
            showModal={() => showModal(1)}
          />
        </div>
        <div>
          <Payment
            method={'기프티콘'}
            imgSrc={`${process.env.PUBLIC_URL}/Imgs/Vector.svg`}
            showModal={() => showModal(2)}
          />
        </div>
      </div>
      <div className="paymentRow">
        <div>
          <Payment
            method={'선불 카드'}
            imgSrc={`${process.env.PUBLIC_URL}/Imgs/선불카드 2.svg`}
            showModal={() => showModal(2)}
          />
        </div>
        <div>
          <Payment
            method={'카카오페이'}
            imgSrc={`${process.env.PUBLIC_URL}/Imgs/카카오페이 1.svg`}
            showModal={() => showModal(2)}
          />
        </div>
      </div>
      <div className="smallButton">
        <Call showModal={() => showModal(3)} />
      </div>
      {modal && <Pay setModal={setModal} num={selectedNum} />}
    </div>
  );
}

export default App;
