const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const env = require("dotenv");
const xlsx = require("xlsx");
const fileUpload = require("express-fileupload");
const { MongoClient } = require("mongodb");

env.config();

const port = 3080;

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(fileUpload());

const secretKey = process.env.SECRET_KEY;

app.use(bodyParser.json());
console.log(process.env.MONGO_URI);

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = client.db("moomen");
const users = db.collection("users");
const dataCollection = db.collection("data");

app.post("/register", async (req, res) => {
  try {
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      role: "user",
    };
    console.log(user);
    users.insertOne(user);
    res.status(201).send("User registered successfully");
  } catch {
    res.status(500).send("Error registering user");
  }
});

app.post("/login", async (req, res) => {
  const user = await users.findOne({
    email: req.body.email,
  });

  if (user == null) return res.status(400).send("User not found");
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        { email: user.email, role: user.role },
        secretKey
      );
      res.json({
        token: accessToken,
        user: {
          name: user.firstname + " " + user.lastname,
          email: user.email,
          role: user.role,
        },
      });
    } else if (req.body.password === user.password) {
      const accessToken = jwt.sign(
        { email: user.email, role: user.role },
        secretKey
      );
      res.json({
        token: accessToken,
        user: {
          name: user.firstname + " " + user.lastname,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(401).send("Authentication failed");
    }
  } catch {
    res.status(500).send("Error logging in");
  }
});

app.get("/users", async (req, res) => {
  const usersList = await users.find({ role: "user" }).toArray();
  res.json(usersList || []);
});

app.delete("/user/:email", async (req, res) => {
  const email = req.params.email;
  const result = await users.deleteOne({ email: email });
  res.json(result || []);
});

app.put("/user/:email", async (req, res) => {
  const email = req.params.email;
  const result = await users.updateOne(
    { email: email },
    {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
      },
    }
  );
  res.json(result || []);
});

app.post("/upload", async (req, res) => {
  const file = req.files.file;

  const workbook = xlsx.read(file.data, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  const result = await dataCollection.insertMany(data);
  res.json(result || []);
});

app.get("/columns", async (req, res) => {
  const columns = await dataCollection.findOne({}, { projection: { _id: 0 } });
  res.json(Object.keys(columns) || []);
});

app.get("/data", async (req, res) => {
  const data = await dataCollection
    .find({}, { projection: { _id: 0 } })
    .toArray();
  res.json(data || []);
});

app.delete("/data", async (req, res) => {
  const result = await dataCollection.deleteMany({});
  res.json(result || []);
});

app.get("/occuranceTotal", async (req, res) => {
  //get sum of every Occurences column value in the collection that are encoded as int32
  const result = await dataCollection.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: {
            $toInt: "$Occurences",
          },
        },
      },
    },
  ]);

  res.json(result || []);
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
