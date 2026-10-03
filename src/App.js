import { useCallback, useEffect, useState } from "react";
import { useLocation, BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import BlogPost from "./components/Thoughts/BlogPost";
import BlogList from "./components/Thoughts/BlogList.js";
import Adminblog from "./components/admin/Blog";
import CreatePost from "./components/admin/CreatePost.jsx";
import AdminLogin from "./components/admin/Login.jsx";
import AdminRoute from "./components/admin/AdminRoute";
import ScrollToTop from "./components/ScrollToTop";
import Cursor from "./components/fx/Cursor";
import { TransitionProvider } from "./components/fx/Transition";
import { startSmooth, stopSmooth, getLenis } from "./lib/smooth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "./App.css";
import "./styles/site.css";

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Smooth scroll everywhere except the admin screens (they have their own scroll containers).
  useEffect(() => {
    if (isAdminRoute) { stopSmooth(); return undefined; }
    startSmooth();
    return undefined;
  }, [isAdminRoute]);

  // Freeze scrolling until the preloader has lifted.
  useEffect(() => {
    const lenis = getLenis();
    if (loading) lenis?.stop(); else lenis?.start();
  }, [loading, isAdminRoute]);

  const onReveal = useCallback(() => setReady(true), []);
  const onDone = useCallback(() => setLoading(false), []);

  return (
    <TransitionProvider>
      {loading && <Preloader onReveal={onReveal} onDone={onDone} />}
      <Cursor />
      <div className="pf-grain" aria-hidden="true" />
      {!isAdminRoute && <Navbar />}

      <div className="App">
        <main className="pf-main">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage ready={ready} />} />
            <Route path="/thoughts" element={<BlogList />} />
            <Route path="/thoughts/:slug" element={<BlogPost />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/blog" element={<AdminRoute><Adminblog /></AdminRoute>} />
            <Route path="/admin/create" element={<AdminRoute><CreatePost /></AdminRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </TransitionProvider>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
