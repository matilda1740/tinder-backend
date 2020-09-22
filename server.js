import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Cards from "./dbCards.js";

// App Config

const app = express();
const port = process.env.PORT || 8001;
const db =
  "mongodb+srv://tinder-user:tinderUser1234@tinder-clone.vcsv1.mongodb.net/tinder-clone?retryWrites=true&w=majority";

// Middlewares
app.use(express.json());
app.use(cors());

// DB Config
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(port))
  .catch((error) => console.log(error.message));

// API Endpoints
app.get("/", (request, response) => {
  response.status(200).send("Hello API");
});

app.post("/tinder/cards", (request, response) => {
  const dbCard = request.body;

  Cards.create(dbCard, (error, data) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (request, response) => {
  Cards.find((error, data) => {
    if (error) {
      response.status(500).send(error);
      console.log(error);
    } else {
      response.status(200).send(data);
    }
  });
});
