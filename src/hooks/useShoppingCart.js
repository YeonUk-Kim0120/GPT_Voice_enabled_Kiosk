import { useState } from 'react';

function useShoppingCart(initialForm) {
  const [shoppingCart, setShoppingCart] = useState(initialForm);

  const onChange = () => {
    const product = { ...prevProduct };
    setShoppingCart(product);
  };
}

export default useShoppingCart;
