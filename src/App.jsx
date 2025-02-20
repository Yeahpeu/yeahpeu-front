import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Layout from "./components/Layout";
import SplashPage from "./pages/SplashPage";
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
import MyPage from "./pages/MyPage";
import MyPageEdit from "./pages/MyPageEdit";
import InvitationCodePage from "./pages/InvitationCodePage";
import SubcategoryPage from "./pages/SubcategoryPage";
import WishPage from "./pages/WishPage";
import WishMainMolecule from "./molecules/WishMolecules/WishMainMolecule";
import WishSearchMolecule from "./molecules/WishMolecules/WishSearchMolecule";
import TestPage from "./pages/testPage";
import { useCheckOnboarding } from "./api/onboardingAPI";
import ScrollToTop from "./components/ScrollToTop";
import SocialProcessPage from "./pages/SocialProcessPage";
import ChatAiRoomPage from "./pages/ChatAiRoomPage";
import GamePage from "./pages/GamePage";

// 인증이 필요한 라우트를 감싸는 컴포넌트
function AuthRoute() {
  const location = useLocation();
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];
  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}

function OnboardingRoute() {
  const location = useLocation();
  const { data: onboarded } = useCheckOnboarding();
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];
  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  if (!onboarded) {
    return (
      <Navigate
        to="/invitationCode"
        state={{ from: location.pathname }}
        replace
      />
    );
  }
  if (onboarded.onboarded) {
    return <Navigate to="/home" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}

// 비인증 사용자만 접근 가능한 라우트를 감싸는 컴포넌트
function PublicRoute() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <div className="mx-auto max-w-[430px] w-full min-h-screen relative bg-white shadow-lg">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/oauth" element={<SocialProcessPage />} />
          {/* 비인증 사용자만 접근 가능한 라우트 */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          {/* 온보딩 과정 */}
          <Route element={<OnboardingRoute />}>
            <Route path="/invitationCode" element={<InvitationCodePage />} />
            <Route
              path="/registrationStatus"
              element={<RegistrationStatusPage />}
            />
            <Route path="/onboarding" element={<OnboardingPage />} />
          </Route>
          {/* 인증된 사용자만 접근 가능한 라우트 */}
          <Route element={<AuthRoute />}>
            <Route element={<Layout />}>
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
              <Route path="/shop" element={<WishPage />}>
                <Route index element={<WishMainMolecule />} />
                <Route path="main" element={<WishMainMolecule />} />
                <Route path="search" element={<WishSearchMolecule />} />
              </Route>
              <Route path="/shop/mywish" element={<MyWishPage />} />
            </Route>
            <Route path="/chat/mychat/rooms/ai" element={<ChatAiRoomPage />} />
            <Route
              path="/chat/mychat/rooms/:roomId"
              element={<ChatRoomPage />}
            />
          </Route>
          <Route path="/pingpong" element={<GamePage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
