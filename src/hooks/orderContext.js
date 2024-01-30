import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderNum, setOrderNum] = useState(0);

  const incrementOrderNum = () => {
    setOrderNum((prevOrderNum) => prevOrderNum + 1);
  };

  return (
    <OrderContext.Provider value={[orderNum, incrementOrderNum]}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  return context;
};
