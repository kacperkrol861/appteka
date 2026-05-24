import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

 const handleLogin = async () => {
  try {
    const res = await api.post("token/", {
      username,
      password,
    });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    const role = res.data.user.role;

    if (role === "DOCTOR") {
      navigate("/doctor");
    } else {
      navigate("/dashboard");
    }

  } catch {
    alert("Błąd logowania");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[420px]">

        <h1 className="text-3xl font-bold text-center">
          💊 Appteka
        </h1>

        <div className="mt-6 space-y-4">

          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Login"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="w-full border p-3 rounded-xl"
            placeholder="Hasło"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-3 rounded-xl"
          >
            Zaloguj
          </button>

          <p className="text-center text-sm mt-3">
            Nie masz konta?{" "}
            <Link to="/register" className="text-blue-600">
              Rejestracja
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}