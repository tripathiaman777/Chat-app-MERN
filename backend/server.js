import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js";
import path from "path";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
// const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // allow requests from this origin
    methods: "GET,POST,PUT,DELETE", // allowed HTTP methods
    credentials: true, // if you need to handle cookies
  })
);
// app.get("/", (req, res) => {
//   res.send("Hello World!!");
// });
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute); //middleware
app.use("/api/users", userRoute); //middleware
app.use("/api/messages", messageRoute); //middleware

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend","dist","index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
