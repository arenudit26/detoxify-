import express from "express";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/auth.routes.js";
import feedRoutes from "./routes/feed.routes.js";

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


app.use(session({
  secret: process.env.SESSION_SECRET || "dev_secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false, // Keep false for localhost HTTP, true for HTTPS production
    sameSite: "none", // Allows cross-origin cookie sharing
  }
}));

app.use("/auth", authRoutes);
app.use("/feed", feedRoutes);



app.get("/", (req, res) => {
  res.send("Detoxify backend running!");
});


export default app;
