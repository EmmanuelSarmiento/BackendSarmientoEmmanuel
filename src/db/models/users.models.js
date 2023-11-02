import mongoose, { Schema, model } from "mongoose";

const usersSchema = new Schema({
  first_name: { type: String, require: true },
  last_name: { trype: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  age: { type: Number },
});

export const usersModel = model("User", userSchema);
