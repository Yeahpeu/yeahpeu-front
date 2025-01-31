import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import NavMolecule from "./molecules/NavMolecule";
import HomePage from "./pages/HomePage";
import SchedulePage from "./pages/SchedulePage";
import ChatRoomPage from "./pages/ChatRoomPage";
import ChatPage from "./pages/ChatPage";
import PrepareMainPage from "./pages/PrepareMainPage";
import CalendarMolecule from "./molecules/CalendarMolecule";
import TodosMolecule from "./molecules/TodosMolecule";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RegistrationStatusPage from "./pages/RegistrationStatusPage";
import OnboardingPage from "./pages/OnboardingPage";
import PrepareSearchPage from "./pages/PrepareSearchPage";
import WishPage from "./pages/WishPage";
import ScheduleDetailPage from "./pages/ScheduleDetailPage";
import AllchatMolecule from "./molecules/ChatRoomMolecules/AllchatMolecule";
import MychatMolecule from "./molecules/ChatRoomMolecules/mychatMolecule";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/registrationStatus"
            element={<RegistrationStatusPage />}
          />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/schedule" element={<SchedulePage />}>
            <Route path="calendar" element={<CalendarMolecule />} />
            <Route path="todos" element={<TodosMolecule />} />
          </Route>
          <Route
            path="/schedule/todos/detail/*"
            element={<ScheduleDetailPage />}
          />

          <Route path="/chat" element={<ChatPage />}>
            <Route path="allchat" element={<AllchatMolecule />} />
            <Route path="mychat" element={<MychatMolecule />} />
          </Route>
          <Route path="/chat/mychat/rooms/:roomId" element={<ChatRoomPage />} />

          <Route path="/shop" element={<PrepareMainPage />}>
            <Route path="search" element={<PrepareSearchPage />} />
          </Route>
          <Route path="/shop/mywish" element={<WishPage />} />
        </Routes>
        <NavMolecule />
      </BrowserRouter>
    </>
  );
}

export default App;
