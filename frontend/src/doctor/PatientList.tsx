import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function PatientsList() {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("users/?role=PATIENT").then((res) => {
      setPatients(res.data);
    });
  }, []);

  const handleSelectPatient = async (patient: any) => {
    setSelectedPatient(patient);

    const res = await api.get("prescriptions/");

    const filtered = res.data.filter((p: any) => {
      const patientId = p.patient?.id || p.patient;
      return patientId === patient.id;
    });

    setPrescriptions(filtered);
  };

  return (
    <div className="grid grid-cols-2 gap-6 p-2">

      {/* LEFT SIDE */}
      <div>

        {/* BACK */}
        <button
          onClick={() => navigate("/doctor")}
          className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition"
        >
          ← Powrót do dashboardu
        </button>

        <h2 className="text-xl font-bold mb-4">
          👥 Pacjenci
        </h2>

        <div className="space-y-2">
          {patients.map((p: any) => (
            <div
              key={p.id}
              onClick={() => handleSelectPatient(p)}
              className="bg-white p-3 rounded-xl shadow cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="font-semibold">
                {p.first_name} {p.last_name}
              </div>
              <div className="text-sm text-gray-500">
                PESEL: {p.pesel}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div>

        <h2 className="text-xl font-bold mb-4">
          💊 Szczegóły pacjenta
        </h2>

        {!selectedPatient ? (
          <div className="text-gray-400">
            Kliknij pacjenta aby zobaczyć recepty
          </div>
        ) : (
          <div className="space-y-4">

            {/* PATIENT HEADER */}
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="font-bold text-lg">
                👤 {selectedPatient.first_name} {selectedPatient.last_name}
              </div>
              <div className="text-sm text-gray-600">
                PESEL: {selectedPatient.pesel}
              </div>
            </div>

            {/* PRESCRIPTIONS */}
            {prescriptions.length === 0 ? (
              <div className="text-gray-400">
                Brak recept
              </div>
            ) : (
              prescriptions.map((rx: any) => (
                <div
                  key={rx.id}
                  className="bg-white p-4 rounded-xl shadow"
                >

                  {/* HEADER */}
                  <div className="flex justify-between">
                    <div className="font-semibold">
                      Recepta #{rx.id}
                    </div>

                    <div className="text-sm text-gray-500">
                      {rx.status}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 mt-1">
                    Wygasa: {rx.expires_at}
                  </div>

                  {/* DRUGS */}
                  <div className="mt-3">
                    <div className="font-semibold text-sm mb-2">
                      💊 Leki:
                    </div>

                    {rx.items?.length ? (
                      rx.items.map((item: any, i: number) => (
                        <div
                          key={i}
                          className="text-sm text-gray-700 flex justify-between"
                        >
                          <span>
                            💊{" "}
                            {typeof item.medication === "object"
                              ? item.medication?.name
                              : `Lek #${item.medication}`}
                          </span>

                          <span className="text-gray-500">
                            {item.dosage}
                          </span>

                          {item.instructions && (
                            <div className="text-xs text-gray-400 mt-1">
                              📝 {item.instructions}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-400 text-sm">
                        brak leków
                      </div>
                    )}
                  </div>

                </div>
              ))
            )}

          </div>
        )}
      </div>
    </div>
  );
}