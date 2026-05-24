import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function DoctorDashboard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 p-6 overflow-auto">

        {/* HEADER DASHBOARD */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">

          <h1 className="text-2xl font-bold">
            👨‍⚕️ Witaj lekarzu
          </h1>

          <p className="text-gray-500 mt-1">
            System Appteka działa poprawnie 💊
          </p>

          <div className="mt-4 flex gap-6 text-sm text-gray-600">

            <div className="bg-gray-100 px-4 py-2 rounded-xl">
              🕒 {time.toLocaleTimeString()}
            </div>

            <div className="bg-gray-100 px-4 py-2 rounded-xl">
              📅 {time.toLocaleDateString()}
            </div>

          </div>

        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-3 gap-4 mb-6">

          <div className="bg-white p-4 rounded-xl shadow">
            <div className="text-gray-500 text-sm">
              📋 Recepty
            </div>
            <div className="text-2xl font-bold">
              —
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <div className="text-gray-500 text-sm">
              👥 Pacjenci
            </div>
            <div className="text-2xl font-bold">
              —
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <div className="text-gray-500 text-sm">
              💊 Aktywne leczenia
            </div>
            <div className="text-2xl font-bold">
              —
            </div>
          </div>

        </div>

        {/* PAGE CONTENT */}
        <div>
          <Outlet />
        </div>

      </main>

    </div>
  );
}