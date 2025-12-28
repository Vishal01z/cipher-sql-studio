import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Home from "./Home";
import "./Attempt.css";

/* ✅ ADD */
import fallbackAssignments from "../data/assignments.json";

export default function Attempt() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [error, setError] = useState(null);

  /* ✅ ADD */
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const API = import.meta.env.VITE_API_BASE_URL;

    fetch(`${API}/api/assignments/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch assignment");
        }
        return res.json();
      })
      .then((data) => setAssignment(data))
      .catch((err) => {
        console.error(err);

        /* ✅ ADD: fallback logic */
        const offlineAssignment = fallbackAssignments.find(
          (a) => a._id === id
        );

        if (offlineAssignment) {
          setAssignment(offlineAssignment);
          setUsingFallback(true);
          setError(null);
        } else {
          setError("Assignment not found");
        }
      });
  }, [id]);

  if (error) {
    return (
      <div className="attempt-container">
        <div className="loading">{error}</div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="attempt-container">
        <div className="loading">Loading assignment...</div>
      </div>
    );
  }

  return (
    <>
      <div className="attempt-container">
        <div className="assignment-header">
          <h2>{assignment.title}</h2>

          {assignment.difficulty && (
            <span
              className={`badge badge-${assignment.difficulty.toLowerCase()}`}
            >
              {assignment.difficulty}
            </span>
          )}
        </div>

        {/* ✅ ADD: info message */}
        {usingFallback && (
          <p style={{ color: "#facc15", marginBottom: "10px" }}>
            ⚠ Backend not connected — showing offline assignment
          </p>
        )}

        <div className="assignment-details">
          <div className="detail-section">
            <div className="section-label">Question</div>
            <div className="section-content">
              {assignment.question || "Question will be available soon."}
            </div>
          </div>

          <div className="detail-section">
            <div className="section-label">Schema</div>
            <div className="section-content code-content">
              <pre>{assignment.schemaInfo || "Schema not provided."}</pre>
            </div>
          </div>

          <div className="detail-section">
            <div className="section-label">Sample Data</div>
            <div className="section-content code-content">
              <pre>{assignment.sampleData || "Sample data not available."}</pre>
            </div>
          </div>
        </div>
      </div>

      <Home />
    </>
  );
}
