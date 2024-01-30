import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './component/App';
import PayOKPage from './pages/PayOKPage';
import { OrderProvider } from './hooks/orderContext';

function Main() {
  return (
    <BrowserRouter>
      <OrderProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="payOK" element={<PayOKPage />} />
        </Routes>
      </OrderProvider>
    </BrowserRouter>
  );
}

export default Main;
