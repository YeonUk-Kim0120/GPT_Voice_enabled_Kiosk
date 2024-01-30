import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Modal from "react-modal";
import "./CategoryPage.css";
function CategoryPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  // const [payIsOpen, setPayIsOpen] = useState(false);
  // const [menuIsOpen, setMenuIsOpen] = useState(false);

  const getMenus = async () => {
    const json = await (await fetch("/megaMenu.json")).json();
    setMenus(json);
    setLoading(false);
  };

  useEffect(() => {
    getMenus();
  }, []);

  const filteredMenus = menus.filter((menu) => {
    // 'all' 카테고리가 선택된 경우 모든 메뉴를 반환
    if (selectedCategory === "all")
      return [3, 4, 21, 63, 66, 71, 73, 78, 79].includes(menu.id);
    // 그렇지 않으면 선택된 카테고리에 해당하는 메뉴만 반환
    return menu.category === selectedCategory;
  });
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredMenus.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMenus.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const costSum = 123000;

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

  const goHome = function () {
    navigate("/");
  };

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
              <button
                className="category-button"
                onClick={() => {
                  setSelectedCategory("all");
                  setCurrentPage(1);
                }}
              >
                추천
              </button>
              <button
                className="category-button"
                onClick={() => {
                  setSelectedCategory("커피");
                  setCurrentPage(1);
                }}
              >
                커피
              </button>
              <button
                className="category-button"
                onClick={() => {
                  setSelectedCategory("음료 메뉴");
                  setCurrentPage(1);
                }}
              >
                음료 메뉴
              </button>
              <button
                className="category-button"
                onClick={() => {
                  setSelectedCategory("디카페인");
                  setCurrentPage(1);
                }}
              >
                디카페인
              </button>
              <button
                className="category-button"
                onClick={() => {
                  setSelectedCategory("TEA");
                  setCurrentPage(1);
                }}
              >
                TEA
              </button>
              <button
                className="category-button"
                onClick={() => {
                  setSelectedCategory("스무디, 프라페");
                  setCurrentPage(1);
                }}
              >
                스무디,
                <br /> 프라페
              </button>
              <button
                className="category-button"
                onClick={() => {
                  setSelectedCategory("에이드, 주스");
                  setCurrentPage(1);
                }}
              >
                에이드,
                <br /> 주스
              </button>
              <button
                className="category-button"
                onClick={() => {
                  setSelectedCategory("디저트");
                  setCurrentPage(1);
                }}
              >
                디저트
              </button>
            </div>
            <div className="container-menu-row">
              <div className="header">
                <div className="brand-logo">
                  <img
                    src={`${process.env.PUBLIC_URL}/Imgs/BrandLogo.png`}
                    className="brand-logo"
                  />
                </div>
                <div className="home-icon">
                  <img
                    src={`${process.env.PUBLIC_URL}/Imgs/home.png`}
                    className="home-icon"
                    onClick={goHome}
                  />
                </div>
              </div>

              <div className="menu-grid-container">
                {" "}
                {/* 이 div를 추가 */}
                {currentItems.map((menu) => (
                  <div key={menu.id} className="menu-item1">
                    <img
                      src={`${process.env.PUBLIC_URL}/Imgs/아메리카노.png`}
                      alt={menu.name}
                      className="menu-image1"
                    />
                    <div></div>
                    <div className="menu-name1">{menu.name}</div>
                    <div className="menu-price1">
                      {Boolean(Number(menu.price_hot))
                        ? menu.price_hot
                        : Boolean(Number(menu.price_ice))
                        ? menu.price_ice
                        : menu.price_constant}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bottom">
                <div className="page-indicators">
                  {/* <img
                    src={`${process.env.PUBLIC_URL}/Imgs/dot1.png`}
                    className="page-dot1"
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/Imgs/dot2.png`}
                    className="page-dot2"
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/Imgs/dot2.png`}
                    className="page-dot2"
                  /> */}
                  {currentPage}
                  {"/"}
                  {totalPages}
                </div>
                <div className="page-buttons">
                  {currentPage > 1 && (
                    <img
                      src={`${process.env.PUBLIC_URL}/Imgs/left.png`}
                      className="page-button"
                      onClick={goToPrevPage}
                    />
                  )}
                  {currentPage < totalPages && (
                    <img
                      src={`${process.env.PUBLIC_URL}/Imgs/right.png`}
                      className="page-button"
                      onClick={goToNextPage}
                    />
                  )}
                </div>
              </div>
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
