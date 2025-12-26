import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Home from "./Home";
import "./Attempt.css";

export default function Attempt() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/assignments/${id}`)
      .then(res => res.json())
      .then(data => setAssignment(data));
  }, [id]);

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
          <span className={`badge badge-${assignment.difficulty.toLowerCase()}`}>
            {assignment.difficulty}
          </span>
        </div>

        <div className="assignment-details">
          <div className="detail-section">
            <div className="section-label">Question</div>
            <div className="section-content">{assignment.question}</div>
          </div>

          <div className="detail-section">
            <div className="section-label">Schema</div>
            <div className="section-content code-content">{assignment.schemaInfo}</div>
          </div>

          <div className="detail-section">
            <div className="section-label">Sample Data</div>
            <div className="section-content code-content">
              <pre>{assignment.sampleData}</pre>
            </div>
          </div>
        </div>
      </div>

      <Home />
    </>
  );
}