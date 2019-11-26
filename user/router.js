const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");
const router = new Router();

router.post("/user", (req, res, next) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    return res.status(400).send("Invalid userid and password");
  }
  User.create({ username: username, password: bcrypt.hashSync(password, 10) })
    .then(user => res.json(user))
    .catch(err => next(err));
});

module.exports = router;
