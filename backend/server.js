const app= require("./app");
const dotenv=require("dotenv");
const connectDatabase = require("./config/dbConnect");
//Handelling Uncaught Exception 
process.on("uncaughtException",(err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  server.close(() => {
    process.exit(1)
  });
})
dotenv.config({path:"backend/config/config.env"});
//Connecting to DB
connectDatabase(); 

const server=app.listen(process.env.PORT,() => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//Unhandelled Promise Rejection
process.on("unhandledRejection",(err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to Unhandeled Promise Rejection`);
server.close(() => {
  process.exit(1)
});
})