const mongoose = require("mongoose");

function connectDatabase() {
  mongoose
    .connect(process.env.DB_URI,
      {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then((data) => {
      console.log(`Server is connected with ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectDatabase;
