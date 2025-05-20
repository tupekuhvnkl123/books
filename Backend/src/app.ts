import express, { json } from "express";
import { connectDB } from "./services/mongoose/connectDB";
import routes from "./routes/index";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL, // Frontend's URL
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

app.use(json({ limit: "5mb" }));
app.use(cookieParser());

app.use("/api", routes);

app.use(errorHandler);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
