import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  completedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }]
});

export default mongoose.model("User", userSchema);
