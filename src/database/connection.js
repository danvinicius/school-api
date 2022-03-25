const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_PATH)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((e) => {
    console.log("Failed to connect to MongoDB: ", e);
  });
