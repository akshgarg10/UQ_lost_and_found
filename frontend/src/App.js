import "./style.css";
import Home from "./pages/home";
import AddItem from "./pages/AddItem";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
    {/* What's to be done tommorow ->
    1. sign in page setup
    2. only logged in users can access other pages
    3. create dockerfile*/}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/addItem" element={<AddItem />}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
