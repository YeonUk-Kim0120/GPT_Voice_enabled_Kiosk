import "./PayOK.css";
import { useOrder } from "../hooks/orderContext";
import { Link } from "react-router-dom";

function PayOK() {
  const [orderNum] = useOrder();

  return (
    <Link to="/login" id="link">
      <div className="PayOK">
        <img
          src={`${process.env.PUBLIC_URL}/Imgs/logo.png`}
          alt="카페 로고"
          className="payLogo"
        />
        <div className="payOKText">
          <span className="orange">결제</span>
          <span>가 </span>
          <span className="orange">완료</span>
          <span>되었습니다.</span>
        </div>
        <p className="receiptText">영수증 하단 주문 번호를 확인해주세요.</p>
        <img
          src={`${process.env.PUBLIC_URL}/Imgs/영수증.svg`}
          alt="receipt"
          className="receipt"
        />
        <p className="orderNum">주문번호: {orderNum}</p>
        <p className="thx">이용해주셔서 감사합니다.</p>
      </div>
    </Link>
  );
}

export default PayOK;
