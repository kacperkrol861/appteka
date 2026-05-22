import { useState } from "react";
import api from "./api/axios";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("token/", {
        username,
        password,
      });

      console.log(response.data);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      alert("Zalogowano!");
    } catch (error) {
      console.error(error);
      alert("Błąd logowania");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-[420px] rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center">
          💊 Appteka
        </h1>

        <p className="text-gray-500 text-center mt-2">
          System e-recept
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
          >
            Zaloguj się
          </button>
        </div>
      </div>
    </div>
  );
}