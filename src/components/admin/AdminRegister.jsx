import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../../api/adminAuth";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const res = await registerAdmin({ email, password });

    if (res.token) {
      localStorage.setItem("adminToken", res.token);
      navigate("/admin/blog");
    }
  };

  return (
    <div style={wrapper}>
      <form onSubmit={submit} style={form}>
        <h2 style={title}>Create Admin Account</h2>

        <input
          style={input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={button}>Register</button>
      </form>
    </div>
  );
};

const wrapper = {
  minHeight: "100vh",
  background: "#252525",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const form = {
  background: "#1e1e1e",
  padding: 30,
  width: 350,
};

const title = { color: "#d5c9b4", marginBottom: 20 };
const input = { width: "100%", padding: 12, marginBottom: 15 };
const button = {
  width: "100%",
  padding: 12,
  background: "#d5c9b4",
  border: "none",
};

export default AdminRegister;