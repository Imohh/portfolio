import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import BlogPost from "./components/Thoughts/BlogPost";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import Adminblog from './components/admin/Blog';
import CreatePost from './components/admin/CreatePost.jsx';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BlogList from "./components/Thoughts/BlogList.js";
import AdminLogin from "./components/admin/Login.jsx";
import AdminRoute from "./components/admin/AdminRoute";

function AppContent() {
  const [load, upadateLoad] = useState(true);
  const location = useLocation();
  
  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        {/* Only show Navbar if NOT on admin route */}
        {!isAdminRoute && <Navbar />}
        
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/thoughts" element={<BlogList />} />
          <Route path="/thoughts/:slug" element={<BlogPost />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/blog"
            element={
              <AdminRoute>
                <Adminblog />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/create"
            element={
              <AdminRoute>
                <CreatePost />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
        
        {/* Only show Footer if NOT on admin route */}
        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;