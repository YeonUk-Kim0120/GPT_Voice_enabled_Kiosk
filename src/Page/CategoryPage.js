import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./CategoryPage.css";

function CategoryPage() {
  const [loading, setLoading] = useState(false);
  const [menus, setMenu] = useState([]);
  const [payIsOpen, setPayIsOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const getMenu = async () => {
    const json = await (await fetch(``)).json();
    setMenu(json.data.menus);
    setLoading(false);
  };

  const ScreenStyle = {
    width: "370px",
    height: "824px",
    margin: "0 auto",
    border: "1px solid black", // 경계를 확인하기 위한 임시 스타일
  };

  useEffect(() => {
    getMenu();
  }, []);

  //버튼들 만들기
  return (
    <div style={ScreenStyle}>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          <Modal isOpen={payIsOpen}>
            <button onClick={() => setPayIsOpen(false)}>close</button>
          </Modal>
          <Modal isOpen={menuIsOpen}>
            <button onClick={() => setMenuIsOpen(false)}>close</button>
          </Modal>
          <div>
            <img src="https://w7.pngwing.com/pngs/724/759/png-transparent-apple-logo-apple-computer-icons-apple-logo-heart-computer-logo-thumbnail.png" />
            <button>추천</button>
            <button>커피</button>
            <button>스무디,프라페</button>
            <button>에이드 주스</button>
            <button>차(Tea)</button>
            <button>음료</button>
            <button>디저트</button>
          </div>
          <div>
            {/* {menus.map((menu) => ( 맵은 키 값이 있어야함
            <Menu
              key={menu.id}
              id={menu.id}
              coverImg={menu.medium_cover_image}
              title={menu.title}
              summary={menu.description_full}
              genres={menu.genres}
            />
          ))} */}
            <button>
              <img src="" />
            </button>
            <button>
              <img src="" />
            </button>
          </div>

          <div>
            <div>
              <p>주문한 상품</p>
              <p>총 금액:</p>
              <h3>price</h3>
            </div>
            <button onClick={() => setPayIsOpen(true)}>결제하기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
