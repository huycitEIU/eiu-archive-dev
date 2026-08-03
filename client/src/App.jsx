import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import DashboardLayout from "./layouts/DashboardLayout";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Profile/Settings";
import Overview from "./pages/Dashboard/OverviewPage";
import Documents from "./pages/Dashboard/DocumentsPage";
import Upload from "./pages/Dashboard/UploadPage";
import ExploreLayout from "./layouts/ExploreLayout";
import ExplorePage from "./pages/Explore/ExplorePage";

import { ConfigProvider, App as AntApp } from "antd";

import { customTheme } from "./style/themeConfig";

function App() {
  return (
    <ConfigProvider theme={customTheme}>
      <AntApp>
        <BrowserRouter>
          <Routes>
            {/* Trang chính */}
            <Route path="/" element={<ExploreLayout />}>
              <Route path="explore" element={<ExplorePage />} />
            </Route>
            {/* Trang đăng nhập */}
            <Route path="/login" element={<Login />} />

            {/* Trang đăng ký */}
            <Route path="/register" element={<Register />} />

            {/* Trang Dashboard sau khi đăng nhập */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="overview" element={<Overview />} />
              <Route path="upload" element={<Upload />} />
              <Route path="documents" element={<Documents />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
