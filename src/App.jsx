import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PostPage from "./pages/PostPage";
import MyPage from "./pages/MyPage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="web_layout_wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
