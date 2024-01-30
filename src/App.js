import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "./Page/CategoryPage";
import StartPage from "./Page/StartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/category" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
