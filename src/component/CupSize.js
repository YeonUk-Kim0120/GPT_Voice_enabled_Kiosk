function CupSize({ isCupSizeClicked, handleCupSizeClick }) {
  return (
    <div id="cup-size-option">
      <span className="cup-size">사이즈</span>
      <button
        value="small"
        className={`choose ${isCupSizeClicked === 'small' ? 'active' : ''}`}
        onClick={() => handleCupSizeClick('small')}
      >
        <img
          src={`${process.env.PUBLIC_URL}/Imgs/매장용컵.png`}
          alt="컵사이즈"
        />
        <p className="sml">small </p>
      </button>
      <button
        value="medium"
        className={`choose ${isCupSizeClicked === 'medium' ? 'active' : ''}`}
        onClick={() => handleCupSizeClick('medium')}
      >
        <img
          id="medium"
          src={`${process.env.PUBLIC_URL}/Imgs/매장용컵.png`}
          alt="컵사이즈"
        />
        <p className="sml">medium (+300원)</p>
      </button>
      <button
        value="large"
        className={`choose ${isCupSizeClicked === 'large' ? 'active' : ''}`}
        onClick={() => handleCupSizeClick('large')}
      >
        <img
          id="large"
          src={`${process.env.PUBLIC_URL}/Imgs/매장용컵.png`}
          alt="컵사이즈"
        />
        <p className="sml">
          large <br></br>(+500원)
        </p>
      </button>
    </div>
  );
}

export default CupSize;
