import React, { useState } from "react";
import SqlEditor from "../components/SqlEditor.jsx";
import { v4 as uuidv4 } from "uuid";
import "./Home.css";

export default function Home() {
  /* ---------------- Project ID ---------------- */
  const [projectId, setProjectId] = useState(() => {
    const stored = localStorage.getItem("projectId");
    if (stored) return stored;
    const newId = uuidv4();
    localStorage.setItem("projectId", newId);
    return newId;
  });

  /* ---------------- SQL State ---------------- */
  const [query, setQuery] = useState("SELECT 1;");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  /* ---------------- UI State ---------------- */
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : true;
  });
  const [isRunning, setIsRunning] = useState(false);

  /* ---------------- Theme Toggle ---------------- */
  const toggleDarkMode = () => {
    const mode = !darkMode;
    setDarkMode(mode);
    localStorage.setItem("darkMode", JSON.stringify(mode));
  };

  /* ---------------- Run SQL Query ---------------- */
  const runQuery = async () => {
    setIsRunning(true);
    setError(null);
    setResult([]);

    try {
      const res = await fetch("http://localhost:5000/api/sql/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Query execution failed");
      }

      setResult(data.rows || []);
    } catch (err) {
      setError(err.message || "Server error while executing query");
    } finally {
      setIsRunning(false);
    }
  };

  /* ---------------- Copy Project ID ---------------- */
  const copyProjectId = () => {
    navigator.clipboard.writeText(projectId);
  };

  return (
    <div className={`home-container ${darkMode ? "dark" : "light"}`}>
      {/* ---------- Header ---------- */}
      <header className="header">
        <div className="header-left">
          <h1 className="logo">
            <span className="logo-icon">🗄️</span>
            CipherSQLStudio
          </h1>

          <div className="project-info">
            <span>Project ID:</span>
            <code>{projectId.slice(0, 8)}...</code>
            <button onClick={copyProjectId}>📋</button>
          </div>
        </div>

        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>

      {/* ---------- SQL Editor ---------- */}
      <div className="editor-container">
        <SqlEditor
          query={query}
          setQuery={setQuery}
          darkMode={darkMode}
        />
      </div>

      {/* ---------- Toolbar ---------- */}
      <div className="toolbar">
        <button
          className="run-btn"
          onClick={runQuery}
          disabled={isRunning}
        >
          {isRunning ? "Running..." : "▶ Run Query"}
        </button>
      </div>

      {/* ---------- Results ---------- */}
      <div className="results-container">
        {error && <p className="error">{error}</p>}

        {result.length > 0 && (
          <table>
            <thead>
              <tr>
                {Object.keys(result[0]).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j}>{String(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!error && result.length === 0 && (
          <p className="empty">No results</p>
        )}
      </div>
    </div>
  );
}
