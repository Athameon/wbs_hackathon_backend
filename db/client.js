const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_TOKEN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("Connected to mongoDB.");
  })
  .catch((error) => {
    console.error(error);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
