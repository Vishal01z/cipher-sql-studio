import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: String,
  difficulty: String,
  description: String,
  question: String,
  schemaInfo: String,   // table schema text
  sampleData: String   // sample rows text
});

export default mongoose.model("Assignment", assignmentSchema);
