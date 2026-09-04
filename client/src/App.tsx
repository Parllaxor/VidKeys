import {BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import RoomsPage from "./pages/RoomsPage";
import ProfilePage from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import UsersPage from "./pages/UsersPage";
import FriendsPage from "./pages/FriendsPage";
import ChatPage from "./pages/ChatPage";
import ChatHubPage from "./pages/ChatHubPage";
import SettingsPage from "./pages/SettingsPage";
import AvatarSelector from "./components/AvatarSelector";
import ProtectedRoutePage from "./components/ProtectedRoute";

const routerBasename = import.meta.env.BASE_URL === "/"
  ? undefined
  : import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={
                <ProtectedRoutePage>
                    <DashboardPage />
                </ProtectedRoutePage>
            }
        />
            <Route path="/rooms" element={
                <ProtectedRoutePage>
                    <RoomsPage />
                </ProtectedRoutePage>
            }
        />
            <Route path="/profile" element={
                <ProtectedRoutePage>
                    <ProfilePage/>
                </ProtectedRoutePage>
            }
        />
        <Route path="/profile/avatar" element={<AvatarSelector />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/users" element={
                <ProtectedRoutePage>
                    <UsersPage />
                </ProtectedRoutePage>
            }
        />
            <Route path="/friends" element={
                <ProtectedRoutePage>
                    <FriendsPage />
                </ProtectedRoutePage>
            }
        />
            <Route path="/chat" element={
                <ProtectedRoutePage>
                    <ChatHubPage />
                </ProtectedRoutePage>
            }
        />
            <Route path="/chat/:friendId" element={
                <ProtectedRoutePage>
                    <ChatPage />
                </ProtectedRoutePage>
            }
        />
            <Route path="/settings" element={
                <ProtectedRoutePage>
                    <SettingsPage />
                </ProtectedRoutePage>
            }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
