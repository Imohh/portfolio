export const loginAdmin = async (data) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
