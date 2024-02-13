import { useState } from 'react';

function TempOption({ isTempClicked, handleTempClick, price }) {
  const [activeTemp, setActiveTemp] = useState(null);
  console.log(price);

  const handleTempButtonClick = (value) => {
    if (!price[value]) return;
    setActiveTemp(value === activeTemp ? null : value);
    handleTempClick(value);
  };

  return (
    <div id="temp-option">
      <span className="temp">온도</span>
      <button
        value="hot"
        className={`choose ${price.hot === 0 ? 'disabled' : ''} ${
          isTempClicked === 'hot' ? 'active' : ''
        }`}
        onClick={() => handleTempButtonClick('hot')}
        disabled={price.hot === 0}
      >
        <img
          src={`${process.env.PUBLIC_URL}/Imgs/따뜻하게.png`}
          alt="따뜻하게"
        />
        <p>
          따뜻하게{' '}
          {price.hot > 0 &&
          price.ice > 0 &&
          price.hot !== price.ice &&
          price.hot > price.ice
            ? `(+${Math.abs(price.hot - price.ice)}원)`
            : null}
        </p>
      </button>
      <button
        value="ice"
        className={`choose ${price.ice === 0 ? 'disabled' : ''} ${
          isTempClicked === 'ice' ? 'active' : ''
        }`}
        onClick={() => handleTempButtonClick('ice')}
        disabled={price.ice === 0}
      >
        <img
          src={`${process.env.PUBLIC_URL}/Imgs/시원하게.png`}
          alt="시원하게"
        />
        <p>
          시원하게{' '}
          {price.hot > 0 &&
          price.ice > 0 &&
          price.hot !== price.ice &&
          price.ice &&
          price.ice > price.hot
            ? `(+${Math.abs(price.hot - price.ice)}원)`
            : null}
        </p>
      </button>
    </div>
  );
}

export default TempOption;
