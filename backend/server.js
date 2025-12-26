import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import projectRoutes from "./routes/projectRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import sqlRoutes from "./routes/sqlRoutes.js";

dotenv.config();

// ✅ FIRST initialize app
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes (AFTER app is created)
app.use("/api/projects", projectRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/sql", sqlRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("CipherSQLStudio Backend is running ✅");
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
