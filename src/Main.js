import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './component/App';
import Pay1 from './component/Pay1';
import Pay2 from './component/Pay2';
import CallCard from './component/CallCard';
import PayOKPage from './pages/PayOKPage';
import { OrderProvider } from './component/orderContext';

function Main() {
  return (
    <BrowserRouter>
      <OrderProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="pay1" element={<Pay1 />} />
          <Route path="pay2" element={<Pay2 />} />
          <Route path="call" element={<CallCard />} />
          <Route path="payOK" element={<PayOKPage />} />
        </Routes>
      </OrderProvider>
    </BrowserRouter>
  );
}

export default Main;
