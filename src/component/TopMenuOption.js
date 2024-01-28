function TopMenuOption({ name, price, count, setCount }) {
  const plusButton = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const minusButton = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <>
      <img
        className="pic"
        src={`${process.env.PUBLIC_URL}/Imgs/아메리카노.png`}
        alt={name}
      />
      <div className="basic-menu">
        <p className="menu-name" id="name">
          {name}
        </p>
        <p className="menu-price">￦ {price}</p>
        <div className="count-container">
          <button className="count-button" onClick={minusButton}>
            -
          </button>
          <span className="count">{count}</span>
          <button className="count-button plus" onClick={plusButton}>
            +
          </button>
        </div>
      </div>
    </>
  );
}

export default TopMenuOption;
