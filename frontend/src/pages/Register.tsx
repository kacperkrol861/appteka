import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    pesel: "",
    password: "",
    role: "PATIENT",
  });

  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await api.post("register/", form);

      setSuccess(res.data.username);
    } catch {
      alert("Błąd rejestracji");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-[450px]">

        <h1 className="text-3xl font-bold text-center">
          🧬 Rejestracja
        </h1>

        {/* SUCCESS STATE */}
        {success ? (
          <div className="mt-6 bg-green-100 text-green-800 p-5 rounded-xl text-center">
            <h2 className="text-xl font-bold">
              ✅ Konto utworzone!
            </h2>

            <p className="mt-2">
              Twoja nazwa użytkownika:
            </p>

            <p className="text-2xl font-mono font-bold mt-1">
              {success}
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              Przejdź do logowania
            </button>
          </div>
        ) : (
          <>
            <div className="mt-6 space-y-3">

              <input
                className="w-full border p-3 rounded-xl"
                placeholder="Imię"
                onChange={(e) =>
                  setForm({ ...form, first_name: e.target.value })
                }
              />

              <input
                className="w-full border p-3 rounded-xl"
                placeholder="Nazwisko"
                onChange={(e) =>
                  setForm({ ...form, last_name: e.target.value })
                }
              />

              <input
                className="w-full border p-3 rounded-xl"
                placeholder="PESEL"
                onChange={(e) =>
                  setForm({ ...form, pesel: e.target.value })
                }
              />

              <input
                type="password"
                className="w-full border p-3 rounded-xl"
                placeholder="Hasło"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <select
                className="w-full border p-3 rounded-xl"
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="PATIENT">Pacjent</option>
                <option value="DOCTOR">Lekarz</option>
              </select>

              <button
                onClick={handleRegister}
                className="w-full bg-green-600 text-white p-3 rounded-xl"
              >
                Zarejestruj
              </button>

              <p className="text-center text-sm mt-2">
                Masz konto?{" "}
                <Link to="/login" className="text-blue-600">
                  Login
                </Link>
              </p>

            </div>
          </>
        )}
      </div>
    </div>
  );
}