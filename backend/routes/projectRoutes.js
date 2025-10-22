import express from "express";
import {
  saveProject,
  loadProject,
  getAllProjects,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// Save or Update Project
router.post("/save", saveProject);

// Load Project by ID
router.get("/load/:projectId", loadProject);

// Get all projects
router.get("/all", getAllProjects);

// Delete Project
router.delete("/delete/:projectId", deleteProject);

export default router;