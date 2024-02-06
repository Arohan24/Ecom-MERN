const mongoose = require("mongoose");

function connectDatabase() {
  // Check if the DB_URI environment variable is defined
  if (!process.env.DB_URI) {
    console.error("DB_URI environment variable is not defined.");
    return;
  }

  mongoose.connect(process.env.DB_URI);

  mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB at ${process.env.DB_URI}`);
  });
 
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
}

module.exports = connectDatabase;
 