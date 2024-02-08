import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnection from "./databaseConnection.js";
import {
  readTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  completeTodo,
} from "./todoFunction.js";
import { userSignin, userSignout, userSignup, userDetail } from "./users.js";

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(
  cors({
    origin: [process.env.FRONTEND_URl],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/", userSignin);
app.post("/Signup", userSignup);
app.get("/Signout", userSignout);
app.get("/me", userDetail)

app.get("/todo", readTodo);
app.post("/todo", createTodo);
app.put("/todo", updateTodo);
app.delete("/todo", deleteTodo);
app.put("/todo/completed", completeTodo);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
