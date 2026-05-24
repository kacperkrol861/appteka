import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function PrescriptionHistory() {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("prescriptions/").then((res) => {
      setData(res.data);
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-green-600";
      case "EXPIRED":
        return "text-red-500";
      case "USED":
        return "text-gray-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="p-2">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/doctor")}
        className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition"
      >
        ← Powrót do dashboardu
      </button>

      {/* TITLE */}
      <h2 className="text-xl font-bold mb-4">
        📜 Historia recept
      </h2>

      {/* LIST */}
      <div className="space-y-3">
        {data.map((rx: any) => (
          <div
            key={rx.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <div className="font-semibold">
                Recepta #{rx.id}
              </div>

              <div className={`font-bold ${getStatusColor(rx.status)}`}>
                {rx.status}
              </div>
            </div>

            {/* PATIENT */}
            <div className="text-sm text-gray-700 mt-2">
              Pacjent:{" "}
              <span className="font-medium">
                {rx.patient?.first_name} {rx.patient?.last_name}
              </span>
            </div>

            {/* EXTRA INFO */}
            <div className="text-sm text-gray-500 mt-1">
              Wygasa: {rx.expires_at}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}