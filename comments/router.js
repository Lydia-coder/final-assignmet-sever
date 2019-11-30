const { Router } = require("express");
const Comment = require("./model");
const auth = require("../auth/middelWare");
const jwt = require("jsonwebtoken");
User = require("../user/model");
const router = new Router();

// add auth middelware

router.get("/comment", (req, res, next) => {
  Comment.findAll({ include: [User] })
    .then(comment => res.json(comment))
    .catch(next);
});

router.get("/ticket/:ticketId/comment", (req, res, next) => {
  Comment.findAll({
    where: { ticketId: req.params.ticketId }
  })
    .then(comment => res.json(comment))
    .catch(err => next(err));
});

router.post("/ticket/:ticketId/comment", auth, (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const userId = jwt.decode(token).userId;
  Comment.create({
    text: req.body.text,
    ticketId: req.params.ticketId,
    userId: userId
  })
    .then(comment => res.json(comment))
    .catch(err => next(err));
});

module.exports = router;
