const { Schema, models, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  lastName: String,
  createAt: {
    type: Date,
    default: Date.now(),
  },
  todos: [{ title: String, status: String, description: String }],
});

const User = models?.User || model("User", userSchema);

export default User;
