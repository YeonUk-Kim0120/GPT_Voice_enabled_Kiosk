import { useEffect } from 'react';
import App from './App';

function Pay1() {
  useEffect(() => {
    const newWindow = window.open('', 'newWindow', 'width=410,height=300');

    // 팝업이 닫힐 때 부모 창으로 돌아가도록
    const closePopupAndNavigate = () => {
      window.location.href = '/';
    };

    // 취소 버튼을 눌렀을 때 팝업 닫기
    const handleCancelClick = () => {
      newWindow.close();
    };

    const text = '아래의 카드 리더기에 카드를 꽂아주세요!';
    newWindow.document.body.innerHTML = `
      <div class="info-container">
        <p>${text}</p>
        <button id="cancelButton">취소</button>
      </div>
    `;

    const styleElement = newWindow.document.createElement('style');
    styleElement.innerHTML = `
      .info-container {
        width: 390px;
        height: 256px;
        background-color: #fcac43;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
      }
      #cancelButton {
        position: absolute;
        bottom: 64px;
        right: 50px;
        border-radius: 20px;
        border: none;
      }
    `;

    newWindow.document.head.appendChild(styleElement);

    // 취소 버튼에 클릭 이벤트 리스너 등록
    const cancelButton = newWindow.document.getElementById('cancelButton');
    if (cancelButton) {
      cancelButton.addEventListener('click', handleCancelClick);
    }

    // 팝업이 닫힐 때 이벤트 리스너 등록
    newWindow.addEventListener('beforeunload', closePopupAndNavigate);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      newWindow.removeEventListener('beforeunload', closePopupAndNavigate);
      if (cancelButton) {
        cancelButton.removeEventListener('click', handleCancelClick);
      }
    };
  }, []);

  return <App />; // 렌더링할 내용이 없으므로 null 반환
}

export default Pay1;
