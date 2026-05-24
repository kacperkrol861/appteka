import { useState } from "react";
import api from "../api/axios";

export default function MedicationSearch({ onSelect }: any) {
  const [results, setResults] = useState([]);

  const search = async (value: string) => {
    if (value.length < 1) return;

    const res = await api.get(`medications/?search=${value}`);
    setResults(res.data);
  };

  return (
    <div>
      <input
        className="w-full border p-3 rounded-xl"
        placeholder="💊 Szukaj leku..."
        onChange={(e) => search(e.target.value)}
      />

      {results.length > 0 && (
        <div className="border rounded-xl mt-2 bg-white shadow">
          {results.map((m: any) => (
            <div
              key={m.id}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(m);
                setResults([]);
              }}
            >
              {m.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}