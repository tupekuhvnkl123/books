import express, { json } from "express";
import { connectDB } from "./services/mongoose/connectDB";
import routes from "./routes/index";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(json({ limit: "5mb" }));
app.use(cookieParser());

app.use("/api", routes);

app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
