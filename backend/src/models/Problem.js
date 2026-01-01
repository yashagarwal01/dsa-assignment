import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: String,
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  youtubeLink: String,
  practiceLink: String,
  articleLink: String,
  level: { type: String, enum: ["Easy", "Medium", "Hard"] }
});

export default mongoose.model("Problem", problemSchema);
