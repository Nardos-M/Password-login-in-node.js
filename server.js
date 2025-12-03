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
    //const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.title, 10);

    //console.log(salt);
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

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.username === req.body.username);
  if (user == null) {
    return res.status(400).send("can not find user");
  }
  try {
    if (await bcrypt.compare(req.body.title, user.title)) {
      res.send("sucess");
    } else {
      res.send("its not allowed");
    }
  } catch {
    res.status(500).send();
  }
});
app.listen(3000);
