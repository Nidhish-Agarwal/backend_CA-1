const express = require("express");
const app = express();

const users = [];

app.use(express.json());

app.listen(8080, () => {
  console.log("Server is running on port : 8080  link : http://localhost:8080");
});

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to the backend" });
});

app.post("/register", (req, res) => {
  try {
    const { username, email, password, DOB } = req.body;

    if (!username)
      return res.status(400).send({ message: "Username cannot be empty" });
    if (!email)
      return res.status(400).send({ message: "Email cannot be empty" });
    if (!password)
      return res.status(400).send({ message: "Password cannot be empty" });

    if (password.length < 8 || password.length > 16)
      return res.status(400).send({
        message:
          "Password length should be greater than 8 or less than or equal to 16",
      });

    users.push({ username, email, password, DOB });

    return res
      .status(201)
      .json({ message: "User created sucessfully", users: users });
  } catch (er) {
    return res.status(500).json({
      message: "Internal server error",
      error: er.message,
    });
  }
});
