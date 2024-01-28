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

{/\_ <div className="menu-grid-container">
{menus.slice(0, 9).map(
(
menu,
index // 첫 9개의 메뉴 항목만 표시
) => (

<div key={index} className="menu-item">
<img src={menu.fields.image} alt={menu.fields.name} />
<div className="menu-name">{menu.fields.name}</div>
<div className="menu-price">
{menu.fields.price_hot}원
</div>
</div>
)
)}
</div> _/}

---

import React, { useState, useEffect } from 'react';

function CategoryPage() {
const [menus, setMenus] = useState([]);
const [currentPage, setCurrentPage] = useState(0);
const menusPerPage = 9; // 한 페이지에 표시할 메뉴 수

useEffect(() => {
fetch('/megaMenu.json')
.then((response) => response.json())
.then((data) => setMenus(data))
.catch((error) => console.error('Error fetching menus:', error));
}, []);

// 현재 페이지의 메뉴를 계산
const indexOfLastMenu = (currentPage + 1) \* menusPerPage;
const indexOfFirstMenu = indexOfLastMenu - menusPerPage;
const currentMenus = menus.slice(indexOfFirstMenu, indexOfLastMenu);

// 페이지 이동 함수
const goToNextPage = () => {
setCurrentPage(currentPage + 1);
};

const goToPrevPage = () => {
setCurrentPage(currentPage - 1);
};

return (

<div>
{/_ 메뉴 표시 _/}
<div className="menu-grid-container">
{currentMenus.map((menu, index) => (
<div key={index} className="menu-item">
{/_ 메뉴 아이템 내용 _/}
</div>
))}
</div>
{/_ 페이지 이동 버튼 _/}
<button onClick={goToPrevPage} disabled={currentPage === 0}>
Previous
</button>
<button
        onClick={goToNextPage}
        disabled={indexOfLastMenu >= menus.length} >
Next
</button>
</div>
);
}

export default CategoryPage;
