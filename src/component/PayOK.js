import logo from '../imgs/logo.png';
import './PayOK.css';
import receipt from '../imgs/영수증.svg';
import { useOrder } from './orderContext';

function PayOK() {
  const [orderNum] = useOrder();

  return (
    <div className="PayOK">
      <img src={logo} alt="카페 로고" className="payLogo" />
      <div className="payOKText">
        <span className="orange">결제</span>
        <span>가 </span>
        <span className="orange">완료</span>
        <span>되었습니다.</span>
      </div>
      <p className="receiptText">영수증 하단 주문 번호를 확인해주세요.</p>
      <img src={receipt} alt="receipt" className="receipt" />
      <p className="orderNum">주문번호: {orderNum}</p>
      <p className="thx">이용해주셔서 감사합니다.</p>
    </div>
  );
}

export default PayOK;
