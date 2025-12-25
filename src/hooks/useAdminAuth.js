import { useState } from "react";
import { loginAdmin } from "../api/adminAuth";

export const useAdminAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);

    const data = await loginAdmin({ email, password });

    if (data.token) {
      localStorage.setItem("adminToken", data.token);
    }

    setLoading(false);
    return data;
  };

  return { login, loading };
};