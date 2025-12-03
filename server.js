const express = require("express");
const app = express();

const bcrypt = require("bcrypt");

app.use(express.json());

const users = [
  {
    username: "david",
    title: "post 1",
  },
  {
    username: "solomon",
    title: "post 2",
  },
];

app.get("/users", (req, res) => {
  res.json(users);
});

// this is why we need to secure our password coz ppl can see or read it
app.post("/user", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.title, salt);

    console.log(salt);
    console.log(hashedpassword);
    const user = {
      username: req.body.username,
      title: hashedpassword,
    };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.listen(3000);
