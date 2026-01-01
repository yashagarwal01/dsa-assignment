import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import dsaRoutes from "./routes/dsa.routes.js";

dotenv.config();

await connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://ec2-13-48-58-202.eu-north-1.compute.amazonaws.com",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dsa", dsaRoutes);

app.get("/", (req, res) => {
  res.send("DSA Sheet Backend Running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
