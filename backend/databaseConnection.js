import mongoose from "mongoose";

const dbConnection = mongoose
  .connect(
    "mongodb+srv://aditi07hooda:Smssa%4017@todoapp.odxxktf.mongodb.net/",
    {
      dbName: "TodoApp",
    }
  )
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => console.log(e));

export default dbConnection;
