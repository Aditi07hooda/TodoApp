import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnection from "./config/databaseConnection.js";
import {
  readTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  completeTodo,
} from "./controllers/todoFunction.js";
import {
  userSignin,
  userSignout,
  userSignup,
  userDetail,
} from "./controllers/users.js";
import { isAuthenticated } from "./middlewares/auth.js";

const app = express();
const PORT = 5000 || process.env.PORT;

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  import('dotenv').then((dotenv) => {
    dotenv.config({ path: 'config/config.env' });
  });
}

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
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
app.get("/me", userDetail);

app.get("/todo", isAuthenticated, readTodo);
app.post("/todo", isAuthenticated, createTodo);
app.put("/todo", isAuthenticated, updateTodo);
app.delete("/todo", isAuthenticated, deleteTodo);
app.put("/todo/completed", isAuthenticated, completeTodo);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
