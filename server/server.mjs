import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mime from "mime-types";

import * as db from "./db.mjs";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());

const tasks = express.Router();

tasks.get("/", async (request, response) => {
  const tasks = await db.getTasks();
  response.json(tasks);
});

tasks.get("/parks", async (request, response) => {
  // console.log(request);

  const { query } = request;
  console.log("query: ", query);

  const url = `https://developer.nps.gov/api/v1/parks?api_key=${process.env.NPS_API_KEY}`;
  console.log("XXX tasks:/partks: url:", url);

  const result = await axios.get(url, { params: query });
  console.log("XXX tasks:/partks: result:", result);

  response.json(result.data);
});

//developer.nps.gov/api/v1/parks?parkCode=&parkCode=&stateCode=&sort=&api_key=DfbkVVqO5eM8F7cPXqbJVfOmFEHtfmBXsuktlP48

tasks.use(express.json());
tasks.post("/", async (request, response) => {
  const { name } = request.body;
  const task = await db.addTask(name);
  response.status(201).json(task);
});

app.use("/api/tasks", tasks);

process.env?.SERVE_REACT?.toLowerCase() === "true" &&
  app.use(
    express.static("/app", {
      maxAge: "1d",
      setHeaders: (res, path) =>
        ["application/json", "text/html"].includes(mime.lookup(path)) &&
        res.setHeader("Cache-Control", "public, max-age=0"),
    }),
  );

app.get("/api/ping", (request, response) =>
  response.json({ response: "pong" }),
);

app.listen(port, () => {
  console.info(`Example server listening at http://localhost:${port}`);
});
