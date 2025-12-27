import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Attempt.css";

export default function Attempt() {
  const { id } = useParams();

  // 🔹 Mock assignment (no backend)
  const [assignment, setAssignment] = useState(null);

  // 🔹 SQL editor state
  const [sql, setSql] = useState("");
  const [output, setOutput] = useState("");

  // ✅ Load mock assignment
  useEffect(() => {
    const MOCK_ASSIGNMENT = {
      _id: id,
      title: "Find Average Salary",
      difficulty: "Easy",
      question: "Write an SQL query to find the average salary of employees.",
      schemaInfo: "employees(id, name, salary)",
      sampleData: `
1 | Amit  | 30000
2 | Rohit | 40000
3 | Neha  | 50000
      `,
    };

    setAssignment(MOCK_ASSIGNMENT);
  }, [id]);

  // ✅ Fake RUN button logic
  const handleRun = () => {
    // simple fake output
    const fakeResult = `
average_salary
--------------
40000
    `;

    setOutput(fakeResult);
  };

  if (!assignment) {
    return (
      <div className="attempt-container">
        <div className="loading">Loading assignment...</div>
      </div>
    );
  }

  return (
    <div className="attempt-container">
      {/* Header */}
      <div className="assignment-header">
        <h2>{assignment.title}</h2>
        <span className={`badge badge-${assignment.difficulty.toLowerCase()}`}>
          {assignment.difficulty}
        </span>
      </div>

      {/* Question */}
      <div className="assignment-details">
        <div className="detail-section">
          <div className="section-label">Question</div>
          <div className="section-content">{assignment.question}</div>
        </div>

        <div className="detail-section">
          <div className="section-label">Schema</div>
          <div className="section-content code-content">
            {assignment.schemaInfo}
          </div>
        </div>

        <div className="detail-section">
          <div className="section-label">Sample Data</div>
          <div className="section-content code-content">
            <pre>{assignment.sampleData}</pre>
          </div>
        </div>
      </div>

      {/* SQL Editor */}
      <div className="sql-editor">
        <div className="section-label">Write SQL</div>
        <textarea
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          placeholder="SELECT AVG(salary) FROM employees;"
        />
        <button onClick={handleRun} className="run-btn">
          Run
        </button>
      </div>

      {/* Output */}
      {output && (
        <div className="output-section">
          <div className="section-label">Output</div>
          <pre className="output-box">{output}</pre>
        </div>
      )}
    </div>
  );
}
