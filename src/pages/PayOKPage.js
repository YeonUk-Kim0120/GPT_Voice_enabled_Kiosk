import { useEffect } from 'react';
import PayOK from '../component/PayOK';
import { useShoppingCart } from '../hooks/shoppingCart';

function PayOKPage() {
  const [shoppingCart, setShoppingCart] = useShoppingCart();
  useEffect(() => {
    console.log(shoppingCart);
  }, []);
  return <PayOK />;
}

export default PayOKPage;
