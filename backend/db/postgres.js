import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ciphersql",
  password: "1234",     // MUST be string
  port: 5432,
});

// HARD test on startup
(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ PostgreSQL connected (verified)");
  } catch (err) {
    console.error("❌ PostgreSQL connection failed:", err.message);
  }
})();
