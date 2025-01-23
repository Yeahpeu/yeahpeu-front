import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import PrepareMainPage from "./pages/PrepareMainPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/chat" element={<ChatRoomPage />} />
          <Route path="/shop" element={<PrepareMainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
