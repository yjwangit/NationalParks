import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import express, { query } from "express";
import mime from "mime-types";

import * as db from "./db.mjs";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());

const tasks = express.Router();

tasks.get("/", async (request, response) => {
  const tasks = await db.getTasks();
  console.log(tasks);
  response.json(tasks);
});

tasks.get("/parks", async (request, response) => {
  //console.log(request);
  const { query } = request;
  console.log("query: ", query);

  const url = `https://developer.nps.gov/api/v1/parks?api_key=${process.env.NPS_API_KEY}`;
  console.log("XXX tasks:/partks: url:", url);

  const result = await axios.get(url, { params: query });
  console.log("XXX tasks:/partks: result:", result);

  response.json(result.data);
});

tasks.use(express.json());
tasks.post("/addFavorite", async (request, response) => {
  const { parkId, parkName, parkCover, userId } = request.body;
  const params = { parkId, parkName, parkCover, userId };
  await db.insertPark(params);
  await db.insertUser(params);
  response.status(201).json({
    message: "success",
    code: 201,
  });
});
tasks.get("/getUserFavorites", async (request, response) => {
  const { userId } = request.query;
  const data = await db.getUserFavorites(userId);
  response.status(201).json(data);
});
app.use("/api/tasks", tasks); //use tasks router, api/tasks is added before /myFavorites

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
