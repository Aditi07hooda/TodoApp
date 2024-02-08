import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  completionStatus: {
    type: Boolean,
    default: false,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "userSchema", required: true },
});

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  emailId: { type: String, unique: true, required: true },
});

const taskModel = mongoose.model("Task", taskSchema);
const userModel = mongoose.model("Users", userSchema);

export { taskModel, userModel };
