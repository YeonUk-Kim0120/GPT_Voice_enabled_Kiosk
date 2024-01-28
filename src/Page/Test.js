import { useEffect, useState } from "react";
import "./Test.css"; // CSS 파일을 import 합니다.

function Test() {
  const [menus, setMenus] = useState([]); // 메뉴 데이터를 위한 상태

  useEffect(() => {
    fetch("/megaMenu.json") // public 폴더에 있는 menus.json 파일을 fetch 합니다.
      .then((response) => response.json())
      .then((data) => setMenus(data)) // 데이터를 상태에 저장합니다.
      .catch((error) => console.error("Error fetching menus:", error));
  }, []);

  return (
    <div className="menu-list">
      {menus.slice(0, 5).map((menu) => (
        <div key={menu.pk} className="menu-item">
          <img
            src={`${process.env.PUBLIC_URL}/Imgs/아메리카노.png`}
            alt={menu.fields.name}
            className="menu-image"
          />
          <div className="menu-name">{menu.fields.name}</div>
          <div className="menu-price">{menu.fields.price_hot}</div>
        </div>
      ))}
    </div>
  );
}

export default Test;

// import blogo from "../Imgs/Boonga.png";
// <img src={blogo} className="Boong" />
