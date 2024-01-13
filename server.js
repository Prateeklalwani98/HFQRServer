import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const app = express();
const port = 5000;

let dbURL =
  "mongodb+srv://prateeklalwani005:s02ag0FrhFKBpzSQ@test-db.kiq2tsr.mongodb.net/HFQR";

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const ItemsSchema = new mongoose.Schema({
  listName: String,
  url: String,
});

const Item = mongoose.model("Items", ItemsSchema);

app.use(cors());
app.use(express.json());

app.post("/addItem", async (req, res) => {
  const { url, listName } = req.body;

  const newItem = new Item({ url, listName });

  try {
    // Save the item to the database
    await newItem.save();
    console.log("Item added to MongoDB");

    // Return the saved item (including the URL)
    res.status(200).json(newItem);
  } catch (err) {
    console.error("Error adding item to MongoDB:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/getLastSavedUrl", async (req, res) => {
  try {
    // Find the last saved item and return its URL
    const lastSavedItem = await Item.findOne().sort({ _id: -1 }).limit(1);
    res.json({ lastSavedUrl: lastSavedItem ? lastSavedItem.url : null });
  } catch (err) {
    console.error("Error fetching last saved URL from MongoDB:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Connected to server port: ${port}`);
});
