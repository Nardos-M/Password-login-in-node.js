const express = require("express");
const app = express();

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

app.post("/user", (req, res) => {
    const user = {
        username: req.body.username,
        title: req.body.title,
    };
  console.log(req.body);

  users.push(user);
  res.status(201).send();
});

app.listen(3000);
