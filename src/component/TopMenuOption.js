function TopMenuOption({ name, price, count, setCount, img }) {
  const plusButton = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const minusButton = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const priceINT = parseInt(price);
  const priceWON = priceINT.toLocaleString();

  return (
    <>
      <img className="pic" src={img} alt={name} />
      <div className="basic-menu">
        <p className="menu-name" id="name">
          {name}
        </p>
        <p className="menu-price">￦ {priceWON}</p>
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
