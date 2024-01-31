import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import StartPage from "./pages/StartPage";
import App from "./component/App";
import PayOKPage from "./pages/PayOKPage";
import { OrderProvider } from "./hooks/orderContext";

function Main() {
  return (
    <BrowserRouter>
      <OrderProvider>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/pay" element={<App />} />
          <Route path="/pay/payOK" element={<PayOKPage />} />
        </Routes>
      </OrderProvider>
    </BrowserRouter>
  );
}

export default Main;
