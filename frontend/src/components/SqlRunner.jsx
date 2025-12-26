import React, { useState } from "react";
import SqlEditor from "./SqlEditor";

export default function SqlRunner() {
  const [query, setQuery] = useState("SELECT 1;");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const runQuery = async () => {
    setIsRunning(true);
    setError(null);
    setResult([]);

    try {
      const API = import.meta.env.VITE_API_BASE_URL;

      const res = await fetch(`${API}/api/sql/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setResult(data.rows || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="sql-runner">
      <SqlEditor query={query} setQuery={setQuery} darkMode />

      <button onClick={runQuery} disabled={isRunning}>
        {isRunning ? "Running..." : "▶ Run Query"}
      </button>

      {error && <p className="error">{error}</p>}

      {result.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(result[0]).map(col => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((v, j) => (
                  <td key={j}>{String(v)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
