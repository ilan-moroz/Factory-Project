import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import UserRoutes from "./src/routes/User";
import EmployeeRoutes from "./src/routes/Employee";
import ShiftRoutes from "./src/routes/Shift";
import DepartmentRoutes from "./src/routes/Department";
import { resetUserActions } from "./src/tasks/resetUserActions";

dotenv.config();

if (!process.env.MONGO_URL) {
  console.error("Missing MONGO_URL!!!");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use("/departments", DepartmentRoutes);
app.use("/user", UserRoutes);
app.use("/employees", EmployeeRoutes);
app.use("/shifts", ShiftRoutes);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    // Initialize cron
    resetUserActions();
  })
  .catch((error) => {
    console.log(`Cannot connect to database: ${error.message}`);
    process.exit(1);
  });
