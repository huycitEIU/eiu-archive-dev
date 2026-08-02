import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Overview from "./pages/Overview";
import Documents from "./pages/Documents";
import Upload from "./pages/UploadPage";

import { ConfigProvider, App as AntApp } from "antd";

import { customTheme } from "./style/themeConfig";

function App() {
  return (
    <ConfigProvider theme={customTheme}>
      <AntApp>
        <BrowserRouter>
          <Routes>
            {/* Trang đăng nhập */}
            <Route path="/login" element={<Login />} />

            {/* Trang đăng ký */}
            <Route path="/register" element={<Register />} />

            {/* Trang Dashboard sau khi đăng nhập */}
            <Route path="/dashboard" element={<Dashboard />}>
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
