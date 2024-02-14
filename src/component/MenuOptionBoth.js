import { useEffect, useRef, useState } from 'react';
import './MenuOptionBoth.css';
import TopMenuOption from './TopMenuOption';
import CupOption from './CupOption';
import TempOption from './TempOption';

function MenuOptionBoth({ id, setOption, menus }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [count, setCount] = useState(1);
  const [isCupClicked, setIsCupClicked] = useState(null);
  const [isTempClicked, setIsTempClicked] = useState(null);
  const [loading, setLoading] = useState(false);
  const priceRef = useRef(0);

  const menu = menus[id - 1];
  const type = menu.menu_type;
  console.log(menu);

  let price_same = false;
  if (menu.price_hot === menu.price_ice) {
    price_same = true;
  }

  useEffect(() => {
    let selectedPrice = 0;

    if (menu.price_hot != 0 && menu.price_ice != 0) {
      selectedPrice = Math.min(menu.price_hot, menu.price_ice);
    }
    if (menu.price_ice != 0 && menu.price_hot == 0) {
      selectedPrice = menu.price_ice;
    }
    if (menu.price_ice == 0 && menu.price_hot == 0) {
      selectedPrice = menu.price_hot;
    }
    if (menu.price_ice == 0 && menu.price_hot == 0) {
      selectedPrice = menu.price_constant;
    }

    priceRef.current = selectedPrice;

    console.log(typeof selectedPrice);

    if (type == 'both' && isTempClicked === 'ice' && !price_same) {
      let priceDifference = Math.abs(menu.price_hot - menu.price_ice);
      selectedPrice += priceDifference;
    }

    setTotalPrice((selectedPrice * count).toLocaleString());
  }, [menu, count, isTempClicked]);

  const closeOption = () => {
    setOption(false);
  };

  const handleCupClick = (e) => {
    const clickedValue = e.target.value;
    setIsCupClicked(clickedValue);
  };

  const handleTempClick = (value) => {
    setIsTempClicked(value);
  };

  const putItem = () => {
    let itemOption = {};
  };

  return (
    <div className="option-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="top-menu-option">
            <TopMenuOption
              name={menu.name}
              price={priceRef.current}
              count={count}
              setCount={setCount}
              img={menu.image}
            />
          </div>
          <div className="option-choose-container">
            <p className="option-box">메뉴 설명</p>
            <hr />
            <p id="menu-description">{menu.description}</p>
            {menu.category === '디저트' ? null : (
              <>
                <p className="option-box">무료 옵션</p>
                <hr />
                {price_same || type === 'onlyice' || type === 'onlyhot' ? (
                  <TempOption
                    isTempClicked={isTempClicked}
                    handleTempClick={handleTempClick}
                    price={{ ice: menu.price_ice, hot: menu.price_hot }}
                  />
                ) : null}
                <CupOption
                  isCupClicked={isCupClicked}
                  handleCupClick={handleCupClick}
                />
                <p className="option-box">유료 옵션</p>
                <hr />
                {!price_same && type === 'both' ? (
                  <TempOption
                    isTempClicked={isTempClicked}
                    handleTempClick={handleTempClick}
                    price={{ ice: menu.price_ice, hot: menu.price_hot }}
                  />
                ) : null}
              </>
            )}
          </div>
          <hr id="total-line" />
          <div id="total-price-container">
            <span id="total-price-KR">총 금액</span>
            <span id="detail-price">(제품가격+옵션가격)</span>
            <span id="total-price-WON">￦ {totalPrice}</span>
          </div>
          <div id="out-button">
            <button id="cancel-button" onClick={closeOption}>
              취소
            </button>
            <button id="hold-button" onClick={putItem}>
              담기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MenuOptionBoth;
