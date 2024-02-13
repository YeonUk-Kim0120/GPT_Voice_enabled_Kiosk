function CupOption({ isCupClicked, handleCupClick }) {
  return (
    <div id="cup-option">
      <span>컵 선택</span>
      <button
        value="일회용기"
        className={`choose ${isCupClicked === '일회용기' ? 'active' : ''}`}
        onClick={handleCupClick}
      >
        <p>일회용기</p>
        <img
          src={`${process.env.PUBLIC_URL}/imgs/일회용기.png`}
          alt="일회용기"
        />
        <p className="cup-small-option">매장 이용 불가</p>
      </button>
      <button
        value="매장용컵"
        className={`choose ${isCupClicked === '매장용컵' ? 'active' : ''}`}
        onClick={handleCupClick}
      >
        <p>매장용컵</p>
        <img
          src={`${process.env.PUBLIC_URL}/imgs/매장용컵.png`}
          alt="매장용컵"
        />
        <p className="cup-small-option">매장 이용</p>
      </button>
      <button
        value="텀블러"
        className={`choose ${isCupClicked === '텀블러' ? 'active' : ''}`}
        onClick={handleCupClick}
      >
        <p>텀블러</p>
        <img src={`${process.env.PUBLIC_URL}/imgs/텀블러.png`} alt="텀블러" />
        <p className="cup-small-option">스탬프 적립</p>
      </button>
    </div>
  );
}

export default CupOption;
