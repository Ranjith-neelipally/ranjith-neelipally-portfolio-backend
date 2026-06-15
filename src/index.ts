import express from "express";
import dbConnect from "./database";
import { IgnoreFavIcon } from "./MiddleWare";
import {
  AdminRouter,
  AuthRouter,
  ProjectsRouter,
  SkillRouter,
  TestimonialsRouter,
} from "./router";
import { CheckDbConnection, Home } from "./controller/Check";
import { GetAdminDetailsBySlug } from "./controller/Admin";
import { HandleFileUpload } from "./controller/Upload";
import { verifyLoginToken } from "./MiddleWare/TokenVerification";
import bodyParser from "body-parser";

const cors = require("cors");
const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
const port = process.env.PORT || 8083;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(IgnoreFavIcon);

// Ensure database is connected before handling requests
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (err) {
    console.error("Database connection failed during request:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", Home);

app.get("/check", CheckDbConnection);

app.get("/portfolio/:slug", GetAdminDetailsBySlug);
app.post("/upload", verifyLoginToken, HandleFileUpload);
app.use("/get-admin", AdminRouter);
app.use("/auth", AuthRouter);
app.use("/projects", ProjectsRouter);
app.use("/skills", SkillRouter);
app.use("/testimonials", TestimonialsRouter);

// app.listen(port, () => {
//   console.log(
//     `Server is listening on http://localhost:${port}/testimonials`
//   );
// });

export default app;
