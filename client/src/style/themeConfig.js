/*
  EIU Color Palette 
  --eiu-blue: #144069;
  --eiu-gold: #a78656;
  --eiu-neutral: #4e4e50;
  --eiu-gold-soft: rgba(167, 134, 86, 0.3);
  --eiu-red: #b44425;
  --eiu-orange: #d88327;
  --eiu-yellow: #efb31d;
  --eiu-olive: #9d9133;
  --eiu-green: #52813b;
  --eiu-indigo: #4b479d;
*/

export const customTheme = {
    token: {
        colorPrimary: "#144069", // Màu xanh chính
        colorError: "#d88327", // Màu đỏ cho lỗi
        colorWarning: "#efb31d", // Màu vàng cho cảnh báo
        colorSuccess: "#52813b", // Màu xanh lá cho thành công
        colorInfo: "#4b479d", // Màu xanh dương cho thông tin
        colorTextBase: "#4e4e50", // Màu chữ cơ bản
        colorBorder: "#d9d9d9", // Màu viền
        colorBgContainer: "#ffffff", // Màu nền của container
    },
    components: {
        Button: {
            colorPrimaryHover: "#0f2e4f", // Màu khi hover nút chính
            colorPrimaryActive: "#0c223d", // Màu khi nhấn nút chính
        },
        Menu: {
            itemSelectedBg: "var(--eiu-blue)", // Màu nền khi chọn mục menu
            itemSelectedColor: "#ffffff", // Màu chữ khi chọn mục menu
        },
    },
};