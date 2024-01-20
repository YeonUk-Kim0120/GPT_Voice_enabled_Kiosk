import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./CategoryPage.css";

function CategoryPage() {
  const [loading, setLoading] = useState(false);
  const [menus, setMenu] = useState([]);
  const [payIsOpen, setPayIsOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const costSum = 123000;
  const getMenu = async () => {
    const json = await (await fetch(``)).json();
    setMenu(json.data.menus);
    setLoading(false);
  };

  const ScreenStyle = {
    width: "386px",
    height: "840px",
    margin: "0 auto",
    border: "1px solid black", // 경계를 확인하기 위한 임시 스타일
  };

  const basket = {
    width: "230px",
    height: "185px",
    margin: "0 auto",
    border: "1px solid black", // 경계를 확인하기 위한 임시 스타일
  };

  useEffect(() => {
    getMenu();
  }, []);

  //버튼들 만들기
  return (
    <div style={ScreenStyle} className="container-row">
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          <div className="container-colum">
            <div className="team-color">
              <img
                src={`${process.env.PUBLIC_URL}/Imgs/logo.png`}
                className="team-logo"
              />
              <button className="category-button">추천</button>
              <button className="category-button">커피</button>
              <button className="category-button">
                스무디 <br />
                프라페
              </button>
              <button className="category-button">
                에이드 <br />
                주스
              </button>
              <button className="category-button">차(Tea)</button>
              <button className="category-button">음료</button>
              <button className="category-button">디저트</button>
              <button className="category-button">기타</button>
            </div>
            <div className="container-menu-row">
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/Imgs/BrandLogo.png`}
                  className="brand-logo"
                />
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="container-baguni-col">
            <div style={basket} className="basket container-baguni-rowrow">
              <div className="baguni-text1">
                -주문한 상품 <hr />
              </div>
              <div>백에서 받아오기</div>
              <div className="baguni-text-container">
                <div className="baguni-text3"> 총 금액:</div>
                <div className="baguni-text4">{`${costSum}원`}</div>
              </div>
            </div>
            <div className="container-baguni-row">
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/Imgs/Boonga.png`}
                  className="boonga"
                />
              </div>
              <div>
                <button className="pay-button">결제하기</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryPage;
