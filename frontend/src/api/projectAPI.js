import axios from "axios";

const API_BASE = "http://localhost:5000/api/projects";

export async function saveProject(projectId, name, files) {
  try {
    await axios.post(`${API_BASE}/save`, { projectId, name, files });
  } catch (err) {
    console.error("Error saving project:", err);
  }
}

export async function loadProject(projectId) {
  try {
    const res = await axios.get(`${API_BASE}/${projectId}`);
    return res.data;
  } catch (err) {
    console.error("Error loading project:", err);
    return null;
  }
}
