import { useState } from "react";
import api from "../api/axios";

export default function PatientSearch({ onSelect }: any) {
  const [results, setResults] = useState([]);

  const search = async (value: string) => {
    if (value.length < 1) return;

    const res = await api.get(`users/?search=${value}`);
    setResults(res.data);
  };

  return (
    <div>
      <input
        className="w-full border p-3 rounded-xl"
        placeholder="🔎 Szukaj pacjenta..."
        onChange={(e) => search(e.target.value)}
      />

      {results.length > 0 && (
        <div className="border rounded-xl mt-2 bg-white shadow">
          {results.map((p: any) => (
            <div
              key={p.id}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(p);
                setResults([]);
              }}
            >
              {p.username} — {p.first_name} {p.last_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}