import { useState } from "react";
import PatientSearch from "./PatientSearch";
import MedicationSearch from "./MedicationSearch";
import api from "../api/axios";

type MedicationItem = {
  id: number;
  name: string;
  dosage: string;
  instructions: string;
};

export default function PrescriptionForm() {
  const [patient, setPatient] = useState<any>(null);
  const [medications, setMedications] = useState<MedicationItem[]>([]);
  const [expiresAt, setExpiresAt] = useState("");

  const addMedication = (med: any) => {
    setMedications((prev) => [
      ...prev,
      {
        id: med.id,
        name: med.name,
        dosage: "",
        instructions: "",
      },
    ]);
  };

  const updateMedication = (index: number, field: string, value: string) => {
    const updated = [...medications];
    updated[index] = { ...updated[index], [field]: value };
    setMedications(updated);
  };

  const removeMedication = (index: number) => {
    setMedications((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      await api.post("prescriptions/", {
        patient: patient?.id,
        expires_at: expiresAt,
        items: medications.map((m) => ({
          medication: m.id,
          dosage: m.dosage,
          instructions: m.instructions,
        })),
      });

      alert("Recepta wystawiona!");
      setPatient(null);
      setMedications([]);
      setExpiresAt("");
    } catch (err: any) {
      console.log(err.response?.data);
      alert("Błąd wystawiania recepty");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">

      <h2 className="text-xl font-bold text-gray-800">
        🧾 Wystaw nową receptę
      </h2>

      {/* PATIENT */}
      {!patient ? (
        <PatientSearch onSelect={setPatient} />
      ) : (
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded-xl">
          <span className="text-blue-700 font-medium">
            👤 {patient.username}
          </span>

          <button
            onClick={() => setPatient(null)}
            className="text-sm text-red-500 hover:underline"
          >
            zmień
          </button>
        </div>
      )}

      {/* MEDICATION SEARCH */}
      <MedicationSearch onSelect={addMedication} />

      {/* MEDICATION LIST */}
      <div className="space-y-3">
        {medications.map((m, i) => (
          <div
            key={m.id + i}
            className="border rounded-xl p-3 space-y-2 bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">💊 {m.name}</span>

              <button
                onClick={() => removeMedication(i)}
                className="text-red-500 text-sm"
              >
                usuń
              </button>
            </div>

            <input
              className="w-full border p-2 rounded-lg"
              placeholder="Dawkowanie (np. 1x dziennie)"
              value={m.dosage}
              onChange={(e) =>
                updateMedication(i, "dosage", e.target.value)
              }
            />

            <input
              className="w-full border p-2 rounded-lg"
              placeholder="Instrukcje"
              value={m.instructions}
              onChange={(e) =>
                updateMedication(i, "instructions", e.target.value)
              }
            />
          </div>
        ))}
      </div>

      {/* DATE */}
      <input
        type="date"
        className="w-full border p-3 rounded-xl"
        value={expiresAt}
        onChange={(e) => setExpiresAt(e.target.value)}
      />

      {/* SUMMARY */}
      <div className="bg-gray-50 p-4 rounded-xl text-sm space-y-1">
        <div>
          👤 Pacjent: <b>{patient?.username || "-"}</b>
        </div>
        <div>
          💊 Leki: <b>{medications.length}</b>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition"
      >
        Wystaw receptę
      </button>
    </div>
  );
}