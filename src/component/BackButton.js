import { useNavigate } from 'react-router-dom';
import './BackButton.css';

function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="BackButton">
      <button
        className="BackButton"
        onClick={() => {
          navigate(-1);
        }}
      >
        ◀ 뒤로가기
      </button>
    </div>
  );
}

export default BackButton;
