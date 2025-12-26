import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Assignments.css";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 useEffect(() => {
  const API = import.meta.env.VITE_API_BASE_URL;

fetch(`${API}/api/assignments`)

    .then(res => res.json())
    .then(data => {
      setAssignments(data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
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
                <span>Start Assignment</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {assignments.length === 0 && !loading && (
        <div className="no-assignments">
          <p>No assignments available at the moment.</p>
        </div>
      )}
    </div>
  );
}