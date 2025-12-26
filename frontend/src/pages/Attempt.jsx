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
  <div className="attempt-page">
    <div className="question-box">
      <h2>{assignment.title}</h2>

      <span className="label">Question:</span>
      <p>{assignment.question}</p>

      <span className="label">Schema:</span>
      <p>{assignment.schemaInfo}</p>

      <span className="label">Sample Data:</span>
      <div className="sample-data">
        {assignment.sampleData}
      </div>
    </div>

    <div className="editor-wrapper">
      <Home />
    </div>
  </div>
);
}