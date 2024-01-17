// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";

// const app = express();
// const port = 5000;

// const dbURL = "mongodb+srv://prateeklalwani005:s02ag0FrhFKBpzSQ@test-db.kiq2tsr.mongodb.net";
// const dbName = "HFQR";

// mongoose.connect(`${dbURL}/${dbName}`)

//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });

// const ItemsSchema = new mongoose.Schema({
//   listName: String,
//   url: String,
// });

// const Item = mongoose.model("Items", ItemsSchema);

// app.use(cors());
// app.use(express.json());

// app.post("/addItem", async (req, res) => {
//   const { url, listName } = req.body;

//   const newItem = new Item({ url, listName });

//   try {
//     // Save the item to the database
//     await newItem.save();
//     console.log("Item added to MongoDB");

//     // Return the saved item (including the URL)
//     res.status(200).json(newItem);
//   } catch (err) {
//     console.error("Error adding item to MongoDB:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.get("/getLastSavedUrl", async (req, res) => {
//   try {
//     // Find the last saved item and return its URL
//     const lastSavedItem = await Item.findOne().sort({ _id: -1 }).limit(1);
//     res.json({ lastSavedUrl: lastSavedItem ? lastSavedItem.url : null });
//   } catch (err) {
//     console.error("Error fetching last saved URL from MongoDB:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // app.get("/", (req, res) => {
// //   res.send("Hello World");
// // });

// // For Express server example
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


// app.listen(port, () => {
//   console.log(`Connected to server port: ${port}`);
// });

// -------------------------------------------------

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = 5000;

const dbURL = "mongodb+srv://prateeklalwani005:s02ag0FrhFKBpzSQ@test-db.kiq2tsr.mongodb.net";
const dbName = "HFQR";

mongoose.connect(`${dbURL}/${dbName}`)

  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const ItemsSchema = new mongoose.Schema({
  listName: String,
  url: String,
});

const Item = mongoose.model("Items", ItemsSchema);

// ----------- cx data

const cxDetailsSchema = new mongoose.Schema({
  cxData: Object,
});
const CxDetails = mongoose.model("CxDetails", cxDetailsSchema);


// ----------- cx data end

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

// ----------- cx data
app.post("/saveCxData", async (req, res) => {
  try {
    const { cxDetail } = req.body;
    const newCxDetail = new CxDetails({ cxData: cxDetail });
    await newCxDetail.save();
    console.log("CxDetail added to MongoDB");
    res.status(200).json(newCxDetail);
  } catch (err) {
    console.error("Error adding CxDetail to MongoDB:", err);
    res.status(500).send("Internal Server Error");
  }
});


// ----------- cx data end


app.get("/", (req, res) => {
  res.send("Hello World");
});

// For Express server example
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


app.listen(port, () => {
  console.log(`Connected to server port: ${port}`);
});
