import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Assignments.css";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ FRONTEND-ONLY (NO API)
  useEffect(() => {
    const MOCK_ASSIGNMENTS = [
      {
        _id: "1",
        title: "Find Average Salary",
        difficulty: "Easy",
        description: "Write an SQL query to find the average salary."
      },
      {
        _id: "2",
        title: "Find Highest Salary",
        difficulty: "Easy",
        description: "Write an SQL query to find the highest salary."
      }
    ];

    setAssignments(MOCK_ASSIGNMENTS);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="assignments-container">
        <div className="loading">Loading assignments...</div>
      </div>
    );
  }

  return (
    <div className="assignments-container">
      <div className="header-section">
        <h1>SQL Assignments</h1>
        <p className="subtitle">Master SQL through hands-on practice</p>
      </div>

      <div className="assignments-grid">
        {assignments.map(a => (
          <div className="assignment-card" key={a._id}>
            <div className="card-header">
              <h3>{a.title}</h3>
              <span className={`badge badge-${a.difficulty.toLowerCase()}`}>
                {a.difficulty}
              </span>
            </div>

            <p className="description">{a.description}</p>

            <div className="card-footer">
              <button
                className="attempt-btn"
                onClick={() => navigate(`/attempt/${a._id}`)}
              >
                Start Assignment
              </button>
            </div>
          </div>
        ))}
      </div>

      {assignments.length === 0 && (
        <div className="no-assignments">
          <p>No assignments available at the moment.</p>
        </div>
      )}
    </div>
  );
}
