import express from "express";
import { pool } from "../db/postgres.js";

const router = express.Router();

router.post("/run", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const result = await pool.query(query);
    res.json({ rows: result.rows });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
