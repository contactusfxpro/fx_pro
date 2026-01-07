import React from "react";
import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useLoading, LoadingProvider } from "./context/LoadingContext";
import MainPage from "./pages/MainPage.jsx";
import Navbar from "./components/Navbar.jsx";
import History from "./pages/HistoryPage.jsx";
import Footer from "./components/Footer.jsx";

const AppContent = () => {
  const { theme } = useTheme();
  const { loading } = useLoading();

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            fontSize: "14px",
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#f9fafb" : "#111827",
          },
        }}
      />

      <div
        className={`transition-all duration-300 ${
          loading ? "blur-lg pointer-events-none" : ""
        }`}
      >
        <Navbar />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/history" element={<History />} />
        </Routes>

      <Footer />

      </div>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </ThemeProvider>
  );
};

export default App;
