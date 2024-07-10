import express from "express";
import "./database";
import { IgnoreFavIcon } from "./MiddleWare";
import {
  AdminRouter,
  AuthRouter,
  ProjectsRouter,
  SkillRouter,
  TestimonialsRouter,
} from "./router";
import { CheckDbConnection, Home } from "./controller/Check";
import bodyParser from "body-parser";

const cors = require("cors");
const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
const port = process.env.PORT || 8083;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(IgnoreFavIcon);

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", Home);

app.get("/check", CheckDbConnection);

app.use("/get-admin", AdminRouter);
app.use("/auth", AuthRouter);
app.use("/projects", ProjectsRouter);
app.use("/skills", SkillRouter);
app.use("/testimonials", TestimonialsRouter);

app.listen(port, () => {
  return console.log(
    `Server is listening on http://localhost:${port}/testimonials`
  );
});
