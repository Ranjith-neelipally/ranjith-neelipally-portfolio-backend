import express from "express";
import dbConnect from "./database";
import Portfolio from "./Modal/Portfolio";
import bodyParser from "body-parser";
import { TOKEN_KEY } from "./utils/variables";

const cors = require("cors");
const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
const port = process.env.PORT || 8083;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (err) {
    console.error("Database connection failed during request:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.get("/api/portfolio", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    return res.status(200).json(portfolio);
  } catch (error: any) {
    console.error("Error fetching portfolio:", error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/portfolio", async (req, res) => {
  try {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || apiKey !== TOKEN_KEY) {
      return res.status(401).json({ error: "Unauthorized. Missing or invalid X-API-Key header." });
    }
    const { projects, experience, tools, now } = req.body;
    let portfolio = await Portfolio.findOne();
    if (portfolio) {
      // Update existing
      portfolio.projects = projects;
      portfolio.experience = experience;
      portfolio.tools = tools;
      portfolio.now = now;
      await portfolio.save();
    } else {
      // Create new
      portfolio = new Portfolio({ projects, experience, tools, now });
      await portfolio.save();
    }
    return res
      .status(200)
      .json({ message: "Portfolio saved successfully", data: portfolio });
  } catch (error: any) {
    console.error("Error saving portfolio:", error);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

export default app;
