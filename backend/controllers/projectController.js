import Project from "../models/Project.js";

// Save or Update Project
export const saveProject = async (req, res) => {
  try {
    const { projectId, name, files } = req.body;

    if (!projectId || !files) {
      return res.status(400).json({ 
        error: "Project ID and files are required" 
      });
    }

    // Check if project exists
    let project = await Project.findOne({ projectId });

    if (project) {
      // Update existing project
      project.name = name || project.name;
      project.files = files;
      project.lastModified = new Date();
      await project.save();
      
      return res.status(200).json({
        message: "Project updated successfully",
        project,
      });
    } else {
      // Create new project
      project = new Project({
        projectId,
        name: name || "Untitled Project",
        files,
      });
      await project.save();
      
      return res.status(201).json({
        message: "Project created successfully",
        project,
      });
    }
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({ 
      error: "Failed to save project",
      details: error.message 
    });
  }
};

// Load Project by ID
export const loadProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ 
        error: "Project ID is required" 
      });
    }

    const project = await Project.findOne({ projectId });

    if (!project) {
      return res.status(404).json({ 
        error: "Project not found" 
      });
    }

    res.status(200).json({
      message: "Project loaded successfully",
      project,
    });
  } catch (error) {
    console.error("Error loading project:", error);
    res.status(500).json({ 
      error: "Failed to load project",
      details: error.message 
    });
  }
};

// Get all projects (optional - for listing)
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ lastModified: -1 })
      .select("projectId name lastModified createdAt");

    res.status(200).json({
      message: "Projects fetched successfully",
      projects,
      count: projects.length,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ 
      error: "Failed to fetch projects",
      details: error.message 
    });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOneAndDelete({ projectId });

    if (!project) {
      return res.status(404).json({ 
        error: "Project not found" 
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      project,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ 
      error: "Failed to delete project",
      details: error.message 
    });
  }
};