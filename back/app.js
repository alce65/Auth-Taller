import express from "express";
import cors from "cors";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { signService, hashService, compareService } from "./services/auth.js";

const MOCK_DATA = [
  {
    id: 1,
    name: "Pepe",
    email: "pp@sample.com",
    passwd: hashService("12345", 10),
  },
  {
    id: 2,
    name: "Juan",
    email: "juan@sample.com",
    passwd: hashService("12345", 10),
  },
];

const app = express();

app.use(express.json());

app.use(cors());

app.get("/users", (req, res) => {
  MOCK_DATA.forEach((user) => {
    delete user.passwd;
  });
  res.json(MOCK_DATA);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = MOCK_DATA.find((user) => user.id === Number(id));
  delete user.passwd;
  res.json(user);
});

app.post("/users/register", (req, res) => {
  const data = req.body;
  const newUser = {
    id: MOCK_DATA.length + 1,
    ...data,
    passwd: hashService(data.passwd),
  };
  MOCK_DATA.push(newUser);
  delete newUser.passwd;
  res.status(201);
  res.json(newUser);
});

app.post("/users/login", (req, res) => {
  const data = req.body;
  const user = MOCK_DATA.find((user) => user.email === data.email);
  if (user) {
    const isValid = compareService(data.passwd, user.passwd);
    if (isValid) {
      // delete user.passwd;
      // const payload = {
      //   id: user.id,
      // };
      // const token = jwt.sign(JSON.stringify(payload), SECRET);
      const resp = signService(user);
      res.json(resp);
    } else {
      res.status(401);
      res.json({ message: "Invalid credentials" });
    }
  } else {
    res.status(401);
    res.json({ message: "Invalid credentials" });
  }
});

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const user = MOCK_DATA.find((user) => user.id === Number(id));
  const index = MOCK_DATA.indexOf(user);
  const updatedUser = { ...user, ...data };
  MOCK_DATA[index] = updatedUser;
  res.json(updatedUser);
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = MOCK_DATA.find((user) => user.id === Number(id));
  const index = MOCK_DATA.indexOf(user);
  MOCK_DATA.splice(index, 1);
  res.status(204);
  res.json({});
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
