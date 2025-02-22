const { default: mongoose } = require("mongoose");

async function connectDB() {
  const mongoURI = process.env.MONGO_URI;
  if (mongoose.connections[0].readyState) return;

  mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB Success.");
}

export default connectDB;
