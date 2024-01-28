import { useEffect, useRef, useState } from 'react';
import { getMenus } from '../api';
import './MenuOptionBoth.css';
import TopMenuOption from './TopMenuOption';

function MenuOptionBoth({ id, setOption }) {
  const [menus, setMenus] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [count, setCount] = useState(1);
  const priceRef = useRef(0);

  useEffect(() => {
    const fetchMenus = async () => {
      const menuData = await getMenus();
      setMenus(menuData);
    };

    fetchMenus();
  }, []);

  const menu = menus[id - 1];
  useEffect(() => {
    if (menu) {
      priceRef.current = Math.min(menu.price_hot, menu.price_ice);
      setTotalPrice(priceRef.current * count);
    }
  }, [menu, count]);

  let price_same;
  if (menu) {
    if (menu.price_hot === menu.price_ice) {
      price_same = 1;
    }
  }

  const closeOption = () => {
    setOption(false);
  };

  return (
    <div className="option-container">
      {menu ? (
        <>
          <div className="top-menu-option">
            <TopMenuOption
              name={menu.name}
              price={priceRef.current}
              count={count}
              setCount={setCount}
            />
          </div>
          <p className="option-box">메뉴 설명</p>
          <hr />
          <p id="menu-description">{menu.description}</p>
          <p className="option-box">무료 옵션</p>
          <hr />
          {price_same ? (
            <div id="temp-option">
              <span className="temp">온도</span>
              <button className="choose">
                <img
                  src={`${process.env.PUBLIC_URL}/Imgs/따뜻하게.png`}
                  alt="따뜻하게"
                />
                <p>따뜻하게</p>
              </button>
              <button className="choose">
                <img
                  src={`${process.env.PUBLIC_URL}/Imgs/시원하게.png`}
                  alt="시원하게"
                />
                <p>시원하게</p>
              </button>
            </div>
          ) : null}
          <div id="cup-option">
            <span>컵 선택</span>
            <button className="choose">
              <p>일회용기</p>
              <img
                src={`${process.env.PUBLIC_URL}/imgs/일회용기.png`}
                alt="일회용기"
              />
              <p className="cup-small-option">매장 이용 불가</p>
            </button>
            <button className="choose">
              <p>매장용컵</p>
              <img
                src={`${process.env.PUBLIC_URL}/imgs/매장용컵.png`}
                alt="매장용컵"
              />
              <p className="cup-small-option">매장 이용</p>
            </button>
            <button className="choose">
              <p>텀블러</p>
              <img
                src={`${process.env.PUBLIC_URL}/imgs/텀블러.png`}
                alt="텀블러"
              />
              <p className="cup-small-option">스탬프 적립</p>
            </button>
          </div>
          <p className="option-box">유료 옵션</p>
          <hr />
          {!price_same ? (
            <div id="temp-option">
              <span className="temp">온도</span>
              <button className="choose">
                <img
                  src={`${process.env.PUBLIC_URL}/Imgs/따뜻하게.png`}
                  alt="따뜻하게"
                />
                <p>따뜻하게</p>
              </button>
              <button className="choose">
                <img
                  src={`${process.env.PUBLIC_URL}/Imgs/시원하게.png`}
                  alt="시원하게"
                />
                <p>시원하게</p>
              </button>
            </div>
          ) : null}
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
            <button id="hold-button">담기</button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default MenuOptionBoth;
