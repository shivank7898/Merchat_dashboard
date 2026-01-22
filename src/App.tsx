import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalLayout from "./layout/GlobalLayout";
import Dashboard from "./pages/Dashboard";
import Merchants from "./pages/Merchants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="merchants" element={<Merchants />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
