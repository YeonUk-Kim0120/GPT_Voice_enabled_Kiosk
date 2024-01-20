import './PayOKButton.css';

function PayOKButton({ onClick }) {
  return (
    <button onClick={onClick} className="PayOKButton">
      결제 완료
    </button>
  );
}
export default PayOKButton;
