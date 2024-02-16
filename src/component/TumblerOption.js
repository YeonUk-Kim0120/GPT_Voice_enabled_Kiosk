function TumblerOption({ isTumblerClicked, handleTumblerClick }) {
  return (
    <div id="cup-option">
      <div id="tumbler">
        <span>텀블러</span>
        <br />
        <span>선택</span>
      </div>
      <button
        value="텀블러O"
        className={`choose ${isTumblerClicked === '텀블러O' ? 'active' : ''}`}
        onClick={handleTumblerClick}
      >
        <p>텀블러 O</p>
        <img src={`${process.env.PUBLIC_URL}/imgs/텀블러.png`} alt="텀블러" />
        <p className="cup-small-option">스탬프 적립</p>
      </button>
      <button
        value="텀블러X"
        className={`choose ${isTumblerClicked === '텀블러X' ? 'active' : ''}`}
        onClick={handleTumblerClick}
      >
        <p>텀블러 X</p>
        <img
          src={`${process.env.PUBLIC_URL}/imgs/일회용기.png`}
          alt="일회용기"
        />
      </button>
    </div>
  );
}

export default TumblerOption;
