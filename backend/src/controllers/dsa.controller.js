import Topic from "../models/Topic.js";
import Problem from "../models/Problem.js";
import User from "../models/User.js";

export const getDSA = async (req, res) => {
  const topics = await Topic.find();
  const problems = await Problem.find();
  const user = await User.findById(req.user.id);

  res.json({ topics, problems, completed: user.completedProblems });
};

export const toggleProgress = async (req, res) => {
  const user = await User.findById(req.user.id);
  const { problemId } = req.body;

  const index = user.completedProblems.indexOf(problemId);
  if (index > -1) user.completedProblems.splice(index, 1);
  else user.completedProblems.push(problemId);

  await user.save();
  res.json(user.completedProblems);
};
