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
  const [copied, setCopied] = useState(false);

  /* ---------------- Theme Toggle ---------------- */
  const toggleDarkMode = () => {
    const mode = !darkMode;
    setDarkMode(mode);
    localStorage.setItem("darkMode", JSON.stringify(mode));
  };

  /* ---------------- Run SQL Query ---------------- */
 /* ---------------- Run SQL Query (FRONTEND ONLY) ---------------- */
const runQuery = async () => {
  setIsRunning(true);
  setError(null);
  setResult([]);

  // ⏳ fake delay to simulate server
  setTimeout(() => {
    const normalized = query.trim().toLowerCase();

    // ✅ CASE 1: Average salary
    if (normalized.includes("avg") && normalized.includes("salary")) {
      setResult([{ average_salary: 40000 }]);
    }

    // ✅ CASE 2: Select all
    else if (normalized.startsWith("select")) {
      setResult([
        { id: 1, name: "Amit", salary: 30000 },
        { id: 2, name: "Rohit", salary: 40000 },
        { id: 3, name: "Neha", salary: 50000 }
      ]);
    }

    // ❌ CASE 3: Invalid SQL
    else {
      setError("Syntax error in SQL query");
    }

    setIsRunning(false);
  }, 800);
};


  /* ---------------- Copy Project ID ---------------- */
  const copyProjectId = () => {
    navigator.clipboard.writeText(projectId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`home-container ${darkMode ? "dark" : "light"}`}>
      {/* ---------- Header ---------- */}
      <header className="header">
        <div className="header-left">
          <h1 className="logo">
            <span className="logo-icon">🗄️</span>
            <span className="logo-text">CipherSQLStudio</span>
          </h1>

          <div className="project-info">
            <span className="project-label">Project ID:</span>
            <code className="project-id">{projectId.slice(0, 8)}...</code>
            <button 
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={copyProjectId}
              title="Copy full project ID"
            >
              {copied ? '✓' : '📋'}
            </button>
          </div>
        </div>

        <button 
          className="theme-toggle" 
          onClick={toggleDarkMode}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>

      {/* ---------- SQL Editor ---------- */}
      <div className="editor-section">
        <div className="section-header">
          <h3>SQL Editor</h3>
          <span className="hint">Press Ctrl+Enter to run query</span>
        </div>
        <div className="editor-container">
          <SqlEditor
            query={query}
            setQuery={setQuery}
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* ---------- Toolbar ---------- */}
      <div className="toolbar">
        <button
          className="run-btn"
          onClick={runQuery}
          disabled={isRunning}
        >
          <span className="btn-icon">{isRunning ? "⟳" : "▶"}</span>
          <span className="btn-text">{isRunning ? "Running..." : "Run Query"}</span>
        </button>
        
        <div className="toolbar-info">
          {result.length > 0 && (
            <span className="result-count">
              {result.length} row{result.length !== 1 ? 's' : ''} returned
            </span>
          )}
        </div>
      </div>

      {/* ---------- Results ---------- */}
      <div className="results-section">
        <div className="section-header">
          <h3>Results</h3>
        </div>

        <div className="results-container">
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <div className="error-content">
                <strong>Error:</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          {result.length > 0 && (
            <div className="table-wrapper">
              <table className="results-table">
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
            </div>
          )}

          {!error && result.length === 0 && !isRunning && (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <p>No results to display</p>
              <span className="empty-hint">Run a query to see results here</span>
            </div>
          )}

          {isRunning && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Executing query...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}