import { Link } from 'react-router-dom';
import './Pay.css';
import { useOrder } from './orderContext';

function Pay({ setModal, num }) {
  const [orderNum, incrementOrderNum] = useOrder();

  const closeModal = () => {
    setModal(false);
  };

  const okModal = () => {
    setModal(false);
    incrementOrderNum();
  };

  let text;

  if (num === 1) {
    text = '아래의 카드 리더기에 카드를 꽂아주세요!';
  } else if (num === 2) {
    text = '아래에 바코드를 찍어주세요!';
  } else if (num === 3) {
    text = (
      <>
        직원을 호출하는 중이에요!
        <br />
        잠시만 기다려주세요.
      </>
    );
  }

  return (
    <div className="info-container">
      <p>{text}</p>
      <Link to="payOK">
        <button id="okButton" onClick={okModal}>
          완료
        </button>
      </Link>
      <button id="cancelButton" onClick={closeModal}>
        취소
      </button>
    </div>
  );
}

export default Pay;
