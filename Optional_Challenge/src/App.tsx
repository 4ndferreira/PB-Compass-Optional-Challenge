import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Search from "./pages/search/Search";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/:coordinates" element={<Dashboard />}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>
    </BrowserRouter>
  );
}