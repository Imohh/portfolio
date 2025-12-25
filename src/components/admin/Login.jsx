import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.token) navigate("/admin/blog");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#252525", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={submit} style={{ background: "#1e1e1e", padding: 30, width: 350 }}>
        <h2 style={{ color: "#d5c9b4" }}>Admin Login</h2>
        <input style={input} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input style={input} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button style={button}>Login</button>
      </form>
    </div>
  );
};

const input = { width: "100%", padding: 12, marginBottom: 15 };
const button = { width: "100%", padding: 12, background: "#d5c9b4", border: "none" };

export default AdminLogin;