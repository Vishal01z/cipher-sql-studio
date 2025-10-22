import React, { useState } from "react";
import Editor from "../components/Editor.jsx";
import { saveProject, loadProject } from "../api/projectAPI.js";
import { v4 as uuidv4 } from "uuid";
import "./Home.css";

export default function Home() {
  const [projectId, setProjectId] = useState(() => {
    const stored = localStorage.getItem("projectId");
    if (stored) return stored;
    const newId = uuidv4();
    localStorage.setItem("projectId", newId);
    return newId;
  });

  const [files, setFiles] = useState({
    "/App.js": {
      code: "export default function App() {\n  return (\n    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>\n      <h1>Hello World! 🚀</h1>\n      <p>Start coding here...</p>\n    </div>\n  );\n}",
    },
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : true;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveProject(projectId, "My Project", files);
      showNotification("Project saved successfully! 🟢", "success");
    } catch (error) {
      showNotification("Error saving project! ❌", "error");
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoad = async () => {
    const userInputId = prompt("Enter project ID to load:", projectId);
    if (userInputId && userInputId.trim()) {
      setIsLoading(true);
      try {
        const project = await loadProject(userInputId.trim());
        if (project && project.files) {
          setFiles(project.files);
          setProjectId(userInputId.trim());
          localStorage.setItem("projectId", userInputId.trim());
          showNotification("Project loaded successfully! ✅", "success");
        } else {
          showNotification("No project found for this ID! ⚠️", "warning");
        }
      } catch (error) {
        showNotification("Error loading project! ❌", "error");
        console.error("Load error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNewProject = () => {
    if (window.confirm("Create a new project? Current work will be cleared.")) {
      const newId = uuidv4();
      setProjectId(newId);
      localStorage.setItem("projectId", newId);
      setFiles({
        "/App.js": {
          code: "export default function App() {\n  return (\n    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>\n      <h1>Hello World! 🚀</h1>\n      <p>Start coding here...</p>\n    </div>\n  );\n}",
        },
      });
      showNotification("New project created! 🎉", "success");
    }
  };

  const copyProjectId = () => {
    navigator.clipboard.writeText(projectId).then(
      () => showNotification("Project ID copied! 📋", "success"),
      () => showNotification("Failed to copy! ❌", "error")
    );
  };

  const showNotification = (message, type) => {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    requestAnimationFrame(() => {
      setTimeout(() => notification.classList.add("show"), 10);
    });
    
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  return (
    <div className={`home-container ${darkMode ? "dark" : "light"}`}>
      <header className="header">
        <div className="header-left">
          <h1 className="logo">
            <span className="logo-icon">⚡</span>
            CipherStudio
          </h1>
          <div className="project-info">
            <span className="project-label">Project ID:</span>
            <code className="project-id">{projectId.slice(0, 8)}...</code>
            <button 
              className="copy-btn" 
              onClick={copyProjectId} 
              title="Copy Project ID"
              aria-label="Copy Project ID"
            >
              📋
            </button>
          </div>
        </div>

        <div className="header-right">
          <button 
            className="theme-toggle" 
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <div className="toolbar">
        <button 
          className="toolbar-btn save-btn" 
          onClick={handleSave}
          disabled={isSaving}
          aria-label="Save Project"
        >
          <span className="btn-icon">{isSaving ? "⏳" : "💾"}</span>
          <span className="btn-text">{isSaving ? "Saving..." : "Save"}</span>
        </button>
        
        <button 
          className="toolbar-btn load-btn" 
          onClick={handleLoad}
          disabled={isLoading}
          aria-label="Load Project"
        >
          <span className="btn-icon">{isLoading ? "⏳" : "📂"}</span>
          <span className="btn-text">{isLoading ? "Loading..." : "Load"}</span>
        </button>
        
        <button 
          className="toolbar-btn new-btn" 
          onClick={handleNewProject}
          aria-label="New Project"
        >
          <span className="btn-icon">➕</span>
          <span className="btn-text">New</span>
        </button>
      </div>

      <div className="editor-container">
        <Editor files={files} setFiles={setFiles} darkMode={darkMode} />
      </div>
    </div>
  );
}