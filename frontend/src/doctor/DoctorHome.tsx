import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }: any) =>
    `block p-3 rounded-xl transition ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"
    }`;

  return (
    <div className="w-64 bg-white shadow-xl p-4 space-y-3">

      <h1 className="text-xl font-bold text-blue-600">
        💊 Appteka Doctor
      </h1>

      <NavLink to="/doctor/create" className={linkClass}>
        ➕ Nowa recepta
      </NavLink>

      <NavLink to="/doctor/patients" className={linkClass}>
        👥 Pacjenci
      </NavLink>

      <NavLink to="/doctor/active" className={linkClass}>
        📋 Aktywne recepty
      </NavLink>

      <NavLink to="/doctor/history" className={linkClass}>
        📜 Historia
      </NavLink>

    </div>
  );
}