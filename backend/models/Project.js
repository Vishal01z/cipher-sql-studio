import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      default: "Untitled Project",
    },
    files: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Update lastModified on save
projectSchema.pre("save", function (next) {
  this.lastModified = new Date();
  next();
});

const Project = mongoose.model("Project", projectSchema);

export default Project;