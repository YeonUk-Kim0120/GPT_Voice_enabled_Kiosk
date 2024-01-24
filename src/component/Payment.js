import './Payment.css';

function PaymentPic({ method, imgSrc }) {
  return <img className="picture" src={imgSrc} alt={method} />;
}

function Payment({ method, imgSrc, showModal }) {
  return (
    <button className="button" onClick={showModal}>
      <PaymentPic imgSrc={imgSrc} />
      <h3>{method}</h3>
      {method === '카드 결제' ? (
        <div className="option">(삼성 페이, 애플 페이)</div>
      ) : null}
    </button>
  );
}

export default Payment;
