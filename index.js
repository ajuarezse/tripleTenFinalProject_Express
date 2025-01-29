const express = require("express");

const { PORT = 3000 } = process.env;

const app = express();

app.get("/users/:id", (req, res) => {
  if (!users[req.params.id]) {
    res.send(`This user doesn't exist`);
    return;
  }
  const { name, age } = users[req.params.id];

  res.send(`User ${name}, ${age} years old`);
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
