import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import adminRoute from "./routes/Admin";
import { pgDatasource } from "./configuration/pg-datasource";

dotenv.config();

console.log(process.env.DB_HOST_DOCKER);

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/", adminRoute);

const port = process.env.PORT || 3000;

pgDatasource
  .initialize()
  .then(() => {
    console.log("PG Datasource initialized");
  })
  .catch((err: any) => {
    console.log(err);
  });

mongoose
  .connect(`${process.env.DB_HOST_DOCKER}`)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
