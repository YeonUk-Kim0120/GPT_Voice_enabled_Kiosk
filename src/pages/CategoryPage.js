import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./CategoryPage.css";
import "../component/CurrentTime";
import CurrentTime from "../component/CurrentTime";
import MenuOptionBoth from "../component/MenuOptionBoth";
import Message from "../component/Message";
import { useShoppingCart } from "../hooks/shoppingCart";
import { audioLoad } from "../api";

function CategoryPage() {
  const [messages, setMessages] = useState(
    "안녕하세요!! 붕어방커피에 오신 것을 환영합니다. 주문을 도와드릴까요?"
  );
  const [messages2, setMessages2] = useState(
    "주문하신 메뉴가 맞는지 확인해주세요!"
  );

  const navigate = useNavigate();
  const [shoppingCart, setShoppingCart] = useShoppingCart();
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [payIsOpen, setPayIsOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const getMenus = async () => {
    try {
      const response = await fetch("https://bongabang.shop/api/cafe/v1/menus/"); ///megaMenu.json
      if (!response.ok) {
        throw new Error("Failed to fetch menus");
      }
      const json = await response.json();
      setMenus(json);
      setLoading(false);
      console.log(menus);
    } catch (error) {
      console.error("Error fetching menus: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenus();
    Modal.setAppElement("#root");
    setAudioURL(
      "https://bongabangaudio.s3.ap-southeast-2.amazonaws.com/audio/newoutput_v1_20240309142553.mp3"
    );
  }, []);
  /////////////////////////////////////////////////////////오디오 부분
  // useEffect(() => {
  //   if (audioURL) {
  //     const audio = new Audio(audioURL);
  //     audio.play();

  //     return () => {
  //       audio.pause();
  //       audio = null;
  //     };
  //   }
  //   //fetchAudioURLFromServer();
  // }, [audioURL]);
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [disabled, setDisabled] = useState(true);
  const [audioURL, setAudioURL] = useState("");

  const onRecAudio = () => {
    setDisabled(true);

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  const offRecAudio = () => {
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
      handleSubmit(e.data);
    };

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();

    analyser.disconnect();
    source.disconnect();

    if (audioUrl) {
      URL.createObjectURL(audioUrl);
    }

    const sound = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });

    setDisabled(false);
    console.log(sound);
  };

  // const play = () => {
  //   const audio = new Audio(URL.createObjectURL(audioUrl));
  //   audio.loop = false;
  //   audio.volume = 1;
  //   audio.play();
  // };

  const handleSubmit = async (blobData) => {
    try {
      const formData = new FormData();
      formData.append("audio", blobData, "recordedAudio.wav");
      console.log(formData, typeof formData);
      const response = await fetch("https://bongabang.shop/api/cafe/v1/stt/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json(); // 텍스트 데이터를 JSON 형식으로 파싱
        console.log("Transcribed text:", data.transcripts); // 텍스트 데이터 출력

        // 챗봇 엔드포인트로 텍스트 데이터를 전송
        const chatResponse = await fetch(
          "https://bongabang.shop/api/cafe/v1/chatgpt/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              response: data.transcripts[0],
            }),
          }
        );

        if (chatResponse.ok) {
          console.log("Text submitted to chatbot successfully!");
          const data_1 = await chatResponse.json();
          setAudioURL(data_1.audio_url);
        } else {
          console.error(
            "Error submitting text to chatbot:",
            chatResponse.statusText
          );
        }
      } else {
        console.error("Error submitting audio file:", response.statusText);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  // useEffect(() => {
  //   fetchAudioURLFromServer(audioURL);
  //   if (audioURL) {
  //     const audio = new Audio(audioURL);
  //     audio.play();

  //     return () => {
  //       audio.pause();
  //       audio = null;
  //     };
  //   }
  // }, [audioURL]);

  // async function fetchAudioURLFromServer(audio_url) {
  //   try {
  //     const response = await fetch(audio_url); // 오디오 URL을 반환하는 서버의 엔드포인트
  //     const { url } = await response.json();
  //     setAudioURL(url);
  //   } catch (error) {
  //     console.error("Error fetching audio URL: ", error);
  //   }
  // }

  ///////////////////////////////////////////////////////////////

  // 총 가격을 계산하는 함수
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    shoppingCart.forEach((menu) => {
      totalPrice += Number(menu.price); // 각 메뉴의 가격을 합산합니다.
    });
    return totalPrice;
  };

  // 총 가격을 계산하는 함수
  const calculateTotalCount = () => {
    let totalCount = 0;
    shoppingCart.forEach((menu) => {
      totalCount += Number(menu.count); // 각 메뉴의 가격을 합산합니다.
    });
    return totalCount;
  };

  const deleteMenu = function (id) {
    const updatedMenu = [...shoppingCart];
    const index = updatedMenu.findIndex((menu) => menu.id === id);

    if (index !== -1) {
      updatedMenu.splice(index, 1);
    }

    setShoppingCart(updatedMenu);
  };

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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const ScreenStyle = {
    width: "390px",
    height: "844px",
    margin: "0 auto",
    border: "1px solid black", // 경계를 확인하기 위한 임시 스타일
  };

  const customStyles = {
    content: {
      // top: "0", // 세로 방향에서 화면 꼭대기에 위치
      left: "5%", // 가로 방향에서 화면의 중앙에 위치
      // right: "auto",
      // bottom: "auto",
      // marginRight: "-50%",
      // transform: "translate(-50%, 0)", // 중앙 정렬을 위한 변환
      width: "80%", // 모달의 가로 크기는 화면의 50%
      height: "80%", // 모달의 세로 크기는 화면의 100%
    },
  };

  const basket = {
    width: "220px",
    height: "185px",
    margin: "0 0 0 5px",
    border: "1px solid black", // 경계를 확인하기 위한 임시 스타일
  };
  const goHome = function () {
    //setShoppingCart([]);
    navigate("/login");
  };

  const goPay = function (e) {
    setShoppingCart((prevItems) => [...prevItems, { method: e.target.value }]);
    navigate("/pay");
  };

  const modalPay = function () {
    setPayIsOpen(true);
  };

  const handleDetailOpen = (id) => {
    const selectedItem = menus.find((menu) => menu.id === id);
    setSelectedItem(selectedItem);
    setMenuIsOpen(true);
  };

  return (
    <div style={ScreenStyle} className="container-row">
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          <div className="container-colum">
            <div className="team-color">
              <img
                src={`${process.env.PUBLIC_URL}/Imgs/blogo.png`}
                className="team-logo"
              />
              <button
                className={`category-button ${
                  selectedCategory === "all" ? "active" : ""
                }`}
                onClick={() => handleCategoryClick("all")}
              >
                추천
              </button>
              <button
                className={`category-button ${
                  selectedCategory === "커피" ? "active" : ""
                }`}
                onClick={() => handleCategoryClick("커피")}
              >
                커피
              </button>
              <button
                className={`category-button ${
                  selectedCategory === "음료 메뉴" ? "active" : ""
                }`}
                onClick={() => handleCategoryClick("음료 메뉴")}
              >
                음료 메뉴
              </button>
              <button
                className={`category-button ${
                  selectedCategory === "디카페인" ? "active" : ""
                }`}
                onClick={() => handleCategoryClick("디카페인")}
              >
                디카페인
              </button>
              <button
                className={`category-button ${
                  selectedCategory === "TEA" ? "active" : ""
                }`}
                onClick={() => handleCategoryClick("TEA")}
              >
                TEA
              </button>
              <button
                className={`category-button ${
                  selectedCategory === "스무디, 프라페" ? "active" : ""
                }`}
                onClick={() => handleCategoryClick("스무디, 프라페")}
              >
                스무디,
                <br /> 프라페
              </button>
              <button
                className={`category-button ${
                  selectedCategory === "에이드, 주스" ? "active" : ""
                }`}
                onClick={() => handleCategoryClick("에이드, 주스")}
              >
                에이드,
                <br /> 주스
              </button>
              <button
                className={`category-button ${
                  selectedCategory === "디저트" ? "active" : ""
                }`}
                onClick={() => handleCategoryClick("디저트")}
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

              <Modal isOpen={menuIsOpen} className="detail-modal">
                <MenuOptionBoth menu={selectedItem} setOption={setMenuIsOpen} />
              </Modal>

              <div className="menu-grid-container">
                {" "}
                {/* 이 div를 추가 */}
                {currentItems.map((menu) => (
                  <div
                    onClick={() => handleDetailOpen(menu.id)}
                    key={menu.id}
                    className="menu-item1"
                  >
                    {/* <img
                      src={`${process.env.PUBLIC_URL}/Imgs/아메리카노.png`}
                      alt={menu.name}
                      className="menu-image1"
                    /> */}
                    <div>
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className="menu-image1"
                      />
                    </div>
                    <div className="menu-name1">{menu.name}</div>
                    <div className="menu-price1">
                      {(menu.price_hot
                        ? menu.price_hot
                        : menu.price_ice
                        ? menu.price_ice
                        : menu.price_constant
                      ).toLocaleString()}
                      원
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
                  {/* {currentPage > 1 && (
                    <img
                      src={`${process.env.PUBLIC_URL}/Imgs/leftY.png`}
                      className="page-button"
                      onClick={goToPrevPage}
                    />
                  )} */}
                  {currentPage === 1 ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/Imgs/left.png`}
                      className="page-button"
                      onClick={null}
                    />
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/Imgs/leftY.png`}
                      className="page-button"
                      onClick={goToPrevPage}
                    />
                  )}
                  {currentPage === totalPages ? (
                    <img
                      src={`${process.env.PUBLIC_URL}/Imgs/right.png`}
                      className="page-button"
                    />
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/Imgs/rightY.png`}
                      className="page-button"
                      onClick={goToNextPage}
                    />
                  )}
                  {/* {currentPage < totalPages && (
                    <img
                      src={`${process.env.PUBLIC_URL}/Imgs/rightY.png`}
                      className="page-button"
                      onClick={goToNextPage}
                    />
                  )} */}
                </div>
              </div>
            </div>
          </div>
          <div className="container-baguni-col">
            <div style={basket} className="basket container-baguni-rowrow">
              <div className="baguni-text1"> 주문한 상품</div>
              <div className="baguni-text2">
                {shoppingCart.map((menu) => {
                  // 각 상품의 가격을 costSum에 더합니다.
                  // setCostSum(costSum + Number(menu.price));
                  // console.log(costSum);
                  // map() 함수 내에서는 반드시 유일한 key prop을 제공해야 합니다.
                  return (
                    <div
                      className="shopingcart"
                      key={menu.id}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <div className="shop-mnue-name">{menu.name}</div>
                      <div>{menu.count}개</div>
                      <div>
                        {menu.price !== undefined
                          ? `${menu.price.toLocaleString()}원`
                          : "가격 정보 없음"}
                      </div>

                      <div>
                        <button
                          className="delete-menu-button"
                          onClick={() => {
                            deleteMenu(menu.id);
                          }}
                        >
                          삭제
                        </button>
                      </div>
                      {console.log(menu)}
                      {/* {menu.name}/{menu.temp === "ice" ? "COLD" : "HOT"}/ /
                      {menu.size === "small"
                        ? "S"
                        : menu.size === "medium"
                        ? "M"
                        : "L"}
                      /{menu.tumbler}/{menu.count}개/
                      {menu.price.toLocaleString()}원 */}
                    </div>
                  );
                })}
              </div>
              <div className="baguni-text-container">
                <div className="baguni-text3"> 총 금액:</div>
                <div className="baguni-text4">
                  {calculateTotalPrice().toLocaleString()}원
                </div>
              </div>
            </div>
            <div className="container-baguni-row">
              <div className="" onClick={onRec ? onRecAudio : offRecAudio}>
                <img
                  src={`${process.env.PUBLIC_URL}/Imgs/signature.png`}
                  className="boonga"
                />

                <div className="bubble-loc">
                  <Message message={messages} />
                </div>
              </div>
              <div className="pay-button-loc">
                <button className="pay-button" onClick={modalPay}>
                  결제하기
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <Modal
        isOpen={payIsOpen}
        //onRequestClose={() => setPayIsOpen(false)}
        // style={customStyles}
        contentLabel="pay Modal"
        className="detail-modal"
      >
        <div
          className="detail-modal-container"
          style={{ position: "relative", zIndex: 3 }}
        >
          <div className="detail-modal-header-container">
            <div className="detail-modal-date-container">
              <p className="detail-modal-text-brand">메가커피 통일점</p>
              <p className="detail-modal-text-date">
                <CurrentTime />
              </p>
            </div>
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/Imgs/signature.png`}
                className="boonga2"
              />
              <div style={{ position: "relative", zIndex: 2 }}>
                <Message message={messages2} className="bubble2" />
              </div>
            </div>
          </div>
          <div className="detail-modal-checktext-container-loc">
            <div className="detail-modal-checktext-container">
              주문 세부내용을 확인해 주세요!
            </div>
          </div>
          <div className="detail-modal-list">
            {shoppingCart.length ? (
              shoppingCart.map((menuDetail) => (
                <div className="detail-modal-item">
                  <p className="detail-modal-menu-text">{menuDetail.name}</p>
                  <span className="detail-modal-options-text">
                    {menuDetail.temp === "hot" ? "따뜻하게" : "시원하게"},{" "}
                    {menuDetail.size === "large"
                      ? "L"
                      : menuDetail.size === "medium"
                      ? "M"
                      : "S"}
                  </span>
                  <span className="detail-modal-count-text">
                    {menuDetail.count} 개
                  </span>
                  <span className="detail-modal-price-text">
                    {menuDetail.price} 원
                  </span>
                </div>
              ))
            ) : (
              <div className="detail-modal-nomenu">
                현재 선택한 메뉴가 없습니다.
              </div>
            )}
          </div>
          <div className="detail-modal-total-container">
            <span>총 수량:</span>
            <span>{calculateTotalCount()} 개</span>
          </div>
          <div className="detail-modal-total-container">
            <span>총 결재금액:</span>
            <span>{calculateTotalPrice().toLocaleString()} 원</span>
          </div>
          <div className="detail-modal-btns-container">
            <div>
              <button
                className="detail-modal-cancel-button"
                onClick={() => setPayIsOpen(false)}
              >
                취소
              </button>
            </div>
            <div>
              <button
                className="detail-modal-in-button"
                onClick={goPay}
                value="먹고가기"
              >
                먹고가기
              </button>
            </div>
            <div>
              <button
                className="detail-modal-out-button"
                onClick={goPay}
                value="포장하기"
              >
                포장하기
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CategoryPage;
