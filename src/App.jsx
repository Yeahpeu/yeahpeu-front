import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import NavMolecule from "./molecules/NavMolecule";
import HomePage from "./pages/HomePage";
import BudgetPage from "./pages/BudgetPage";
import SchedulePage from "./pages/SchedulePage";
import ChatRoomPage from "./pages/ChatRoomPage";
import ChatPage from "./pages/ChatPage";
import CalendarMolecule from "./molecules/EventsMolecules/CalendarMolecule";
import TodosMolecule from "./molecules/EventsMolecules/TodosMolecule";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RegistrationStatusPage from "./pages/RegistrationStatusPage";
import OnboardingPage from "./pages/OnboardingPage";
import MyWishPage from "./pages/MyWishPage";
import ScheduleDetailPage from "./pages/ScheduleDetailPage";
import AllchatMolecule from "./molecules/ChatRoomMolecules/AllchatMolecule";
import MychatMolecule from "./molecules/ChatRoomMolecules/MychatMolecule";
import ScheduleInputPage from "./pages/ScheduleInputPage";
import ScheduleEditPage from "./pages/ScheduleEditPage";
import { AnimatePresence } from "framer-motion";
import MyPage from "./pages/MyPage";
import MyPageEdit from "./pages/MyPageEdit";
import InvitationCodePage from "./pages/InvitationCodePage";
import SubcategoryPage from "./pages/SubcategoryPage";
import WishPage from "./pages/WishPage";
import WishMainMolecule from "./molecules/WishMolecules/WishMainMolecule";
import WishSearchMolecule from "./molecules/WishMolecules/WishSearchMolecule";

function App() {
  return (
    <div className="min-h-screen pb-[60px]">
      <AnimatePresence mode="wait">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/invitationCode" element={<InvitationCodePage />} />
            <Route
              path="/registrationStatus"
              element={<RegistrationStatusPage />}
            />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/edit" element={<MyPageEdit />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/schedule" element={<SchedulePage />}>
              <Route path="calendar" element={<CalendarMolecule />} />

              <Route path="todos" element={<TodosMolecule />} />
            </Route>
            <Route
              path="/schedule/todos/detail/:id"
              element={<ScheduleDetailPage />}
            />
            <Route
              path="/schedule/todos/detail/sub/:id"
              element={<SubcategoryPage />}
            />
            <Route
              path="/schedule/todos/edit/:id"
              element={<ScheduleEditPage />}
            />
            <Route
              path="/schedule/todos/input"
              element={<ScheduleInputPage />}
            />

            <Route path="/chat" element={<ChatPage />}>
              <Route path="allchat" element={<AllchatMolecule />} />
              <Route path="mychat" element={<MychatMolecule />} />
            </Route>
            <Route
              path="/chat/mychat/rooms/:roomId"
              element={<ChatRoomPage />}
            />

            <Route path="/shop" element={<WishPage />}>
              <Route index element={<WishMainMolecule />} />
              <Route path="main" element={<WishMainMolecule />} />
              <Route path="search" element={<WishSearchMolecule />} />
            </Route>
            <Route path="/shop/mywish" element={<MyWishPage />} />
          </Routes>
          <NavMolecule />
        </BrowserRouter>
      </AnimatePresence>
    </div>
  );
}

export default App;
