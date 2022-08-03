import express from 'express';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import cors from 'cors';
import postRoutes from './routes/posts.js';

const app = express();


app.use(bodyParser.json( {limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded( {limit:"30mb", extended:true}));
app.use(cors());

app.use('/posts', postRoutes);
const PORT=process.env.PORT || 5000;

// Connection à la BDD
mongoose
  .connect(
    "mongodb://localhost:27017/memoriesApp",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Mongodb connected");
    app.listen(PORT, () => console.log(`Server running on port : ${PORT} `))
  })
  .catch((error) => {
    console.log("Failed Connection to MongoDB: " + error.message);
  });
