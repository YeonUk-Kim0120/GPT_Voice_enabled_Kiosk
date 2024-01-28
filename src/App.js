import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "./Page/CategoryPage";
import StartPage from "./Page/StartPage";
import Test from "./Page/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
