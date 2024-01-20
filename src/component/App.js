// App.js
import React from 'react';
import BackButton from './BackButton';
import './App.css';
import logo from '../imgs/logo.png';
import card from '../imgs/card.svg';
import gifticon from '../imgs/Vector.svg';
import pre_card from '../imgs/선불카드 2.svg';
import kakaopay from '../imgs/카카오페이 1.svg';
import Payment from './Payment';
import Call from './Call';
import { Link } from 'react-router-dom';
import PayOKButton from './PayOKButton';
import { useOrder } from './orderContext';

function App() {
  const [orderNum, incrementOrderNum] = useOrder();

  const handlePayOKClick = () => {
    incrementOrderNum();
  };

  return (
    <div className="App">
      <div className="nav">
        <BackButton />
        <img src={logo} alt="카페 로고" className="logo" />
      </div>
      <h1 className="payment">결제하기</h1>
      <div className="paymentRow">
        <Link to="pay1">
          <Payment method={'카드 결제'} imgSrc={card} />
        </Link>
        <Link to="pay2">
          <Payment method={'기프티콘'} imgSrc={gifticon} />
        </Link>
      </div>
      <div className="paymentRow">
        <Link to="pay2">
          <Payment method={'선불 카드'} imgSrc={pre_card} />
          <Payment method={'카카오페이'} imgSrc={kakaopay} />
        </Link>
      </div>
      <div className="smallButton">
        <Link to="call">
          <Call />
        </Link>
        <Link to="payOK">
          <PayOKButton onClick={handlePayOKClick} />
        </Link>
      </div>
    </div>
  );
}

export default App;
