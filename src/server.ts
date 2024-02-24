import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index";

const app = express();
const port = 3001;

app.use(express.json());
app.use("/api", routes);
mongoose
  .connect(
    "mongodb+srv://florianpescot4:xca5vjaSY9Bnpz6y@clusterprojetfinal.p4yflsh.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongodb is connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log("mongodb is not connected");
  });
