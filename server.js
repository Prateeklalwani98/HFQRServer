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

// --------------------------------- New code below:

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path"; // Add this line for path module

const app = express();
const port = 5000;

const dbURL = "mongodb+srv://prateeklalwani005:s02ag0FrhFKBpzSQ%40test-db.kiq2tsr.mongodb.net";
const dbName = "HFQR";

mongoose.connect(`${dbURL}/${dbName}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const CxDetailsSchema = new mongoose.Schema({
  CxName: {
    type: String,
    required: true,
  },
  CxPhoneNumber: {
    type: String,
    required: true,
  },
  CxEmail: String,
});

const CxDetails = mongoose.model("CxDetails", CxDetailsSchema);

app.use(cors());
app.use(express.json());

// Add the following lines for static file serving
app.use(express.static(path.join(__dirname, 'public'))); // Replace 'public' with your actual static files directory
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust the file path as needed
});

app.post("/addCxDetails", async (req, res) => {
  const { CxName, CxPhoneNumber, CxEmail } = req.body;

  if (!CxName || !CxPhoneNumber) {
    return res.status(400).send("Please enter name & phone number and try again.");
  }

  const newCxDetails = new CxDetails({ CxName, CxPhoneNumber, CxEmail });

  try {
    await newCxDetails.save();
    console.log("CxDetails added to MongoDB");

    res.status(200).json(newCxDetails);
  } catch (err) {
    console.error("Error adding CxDetails to MongoDB:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/getLastSavedUrl", async (req, res) => {
  try {
    const lastSavedItem = await CxDetails.findOne().sort({ _id: -1 }).limit(1);
    res.json({ lastSavedUrl: lastSavedItem ? lastSavedItem.CxEmail : null });
  } catch (err) {
    console.error("Error fetching last saved URL from MongoDB:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Connected to server port: ${port}`);
});
