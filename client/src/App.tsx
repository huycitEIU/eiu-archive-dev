import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { App as AntApp, ConfigProvider, theme } from "antd";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UploadPage from "./pages/Dashboard/UploadPage";
import DashboardLayout from "./layouts/DashboardLayout";
import ManagePage from "./pages/Dashboard/ManagePage";
import OverviewPage from "./pages/Dashboard/OverviewPage";
import { FeedbackPage } from "./pages/Dashboard/FeedbackPage";
import UserPage from "./pages/Dashboard/UserPage";
import ExploreLayout from "./layouts/ExploreLayout";
import DiscoveryPage from "./pages/Explore/DiscoveryPage";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#144069",
          colorSuccess: "#52813b",
          colorWarning: "#d88327",
          colorError: "#b44425",
          colorInfo: "#4b479d",
          colorTextBase: "#4e4e50",
          colorBgBase: "#f8f7f4",
          colorPrimaryBg: "#e8eff5",
          colorPrimaryBgHover: "#c9d8e8",
          colorPrimaryBorder: "#8aa1b8",
          colorPrimaryBorderHover: "#56789a",
          colorPrimaryHover: "#1a5288",
          colorPrimaryActive: "#0d3050",
          colorPrimaryText: "#144069",
          colorPrimaryTextHover: "#1a5288",
          colorPrimaryTextActive: "#0d3050",
          colorSuccessBg: "#edf3ea",
          colorSuccessBgHover: "#d3e3ca",
          colorSuccessBorder: "#9bbc8c",
          colorSuccessBorderHover: "#77a360",
          colorSuccessHover: "#629647",
          colorSuccessActive: "#41682f",
          colorSuccessText: "#52813b",
          colorSuccessTextHover: "#629647",
          colorSuccessTextActive: "#41682f",
          colorWarningBg: "#fbf2e7",
          colorWarningBgHover: "#f5ddbc",
          colorWarningBorder: "#e8b273",
          colorWarningBorderHover: "#e09a4b",
          colorWarningHover: "#e69338",
          colorWarningActive: "#b0681e",
          colorWarningText: "#d88327",
          colorWarningTextHover: "#e69338",
          colorWarningTextActive: "#b0681e",
          colorErrorBg: "#f8ebe7",
          colorErrorBgHover: "#f1d3c9",
          colorErrorBorder: "#d88a73",
          colorErrorBorderHover: "#c9664b",
          colorErrorHover: "#c25333",
          colorErrorActive: "#96371f",
          colorErrorText: "#b44425",
          colorErrorTextHover: "#c25333",
          colorErrorTextActive: "#96371f",
          colorInfoBg: "#ecebf7",
          colorInfoBgHover: "#d4d2ee",
          colorInfoBorder: "#9b99d1",
          colorInfoBorderHover: "#7a76bf",
          colorInfoHover: "#5a56b5",
          colorInfoActive: "#393682",
          colorInfoText: "#4b479d",
          colorInfoTextHover: "#5a56b5",
          colorInfoTextActive: "#393682",
          colorText: "rgba(78, 78, 80, 0.88)",
          colorTextSecondary: "rgba(78, 78, 80, 0.65)",
          colorTextTertiary: "rgba(78, 78, 80, 0.45)",
          colorTextQuaternary: "rgba(78, 78, 80, 0.25)",
          colorTextDisabled: "rgba(78, 78, 80, 0.25)",
          colorBgContainer: "#ffffff",
          colorBgElevated: "#ffffff",
          colorBgLayout: "#f8f7f4",
          colorBgSpotlight: "rgba(78, 78, 80, 0.85)",
          colorBgMask: "rgba(78, 78, 80, 0.45)",
          colorBorder: "#e5e2db",
          colorBorderSecondary: "#f0eee8",
          borderRadius: 6,
          borderRadiusXS: 2,
          borderRadiusSM: 4,
          borderRadiusLG: 8,
          padding: 16,
          paddingSM: 12,
          paddingLG: 24,
          margin: 16,
          marginSM: 12,
          marginLG: 24,
          boxShadow: "0 2px 8px 0 rgba(167, 134, 86, 0.08)",
          boxShadowSecondary: "0 4px 16px 0 rgba(167, 134, 86, 0.12)",
        },
        components: {
          Button: {
            defaultBorderColor: "#a78656",
            defaultBg: "rgba(167, 134, 86, 0.05)",
          },
          Tag: {
            defaultBg: "rgba(167, 134, 86, 0.08)",
            colorBorder: "rgba(167, 134, 86, 0.3)",
          },
          Card: {
            colorBorder: "rgba(167, 134, 86, 0.2)",
            headerBg: "rgba(167, 134, 86, 0.04)",
          },
        },
      }}
    >
      <AntApp>
        <BrowserRouter>
          <Routes>
            {/* Home page */}
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="" element={<OverviewPage />} />
              <Route path="overview" element={<OverviewPage />}></Route>
              <Route path="upload" element={<UploadPage />}></Route>
              <Route path="manage" element={<ManagePage />}></Route>
              <Route path="feedback" element={<FeedbackPage />}></Route>
              <Route path="user" element={<UserPage />}></Route>
            </Route>

            <Route path="/explore" element={<ExploreLayout />}>
              <Route path="" element={<DiscoveryPage />}></Route>
              <Route path="discovery" element={<DiscoveryPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
