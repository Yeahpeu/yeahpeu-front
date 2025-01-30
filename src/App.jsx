import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavMolecule from "./molecules/NavMolecule";
import HomePage from "./pages/HomePage";
import SchedulePage from "./pages/SchedulePage";
import ChatRoomPage from "./pages/ChatRoomPage";
import PrepareMainPage from "./pages/PrepareMainPage";
import CalendarMolecule from "./molecules/CalendarMolecule";
import TodosMolecule from "./molecules/TodosMolecule";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OnboardingPage from "./pages/OnboardingPage";
import PrepareSearchPage from "./pages/PrepareSearchPage";
import WishPage from "./pages/WishPage";
import ScheduleDetailPage from "./pages/ScheduleDetailPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
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
          <Route path="/chat/*" element={<ChatRoomPage />} />
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
