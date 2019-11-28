const { Router } = require("express");
const Comment = require("./model");
// const auth = require("../auth/middelWare");
const router = new Router();

// add auth middelware

router.get("/comment", (req, res, next) => {
  Comment.findAll()
    .then(comment => res.json(comment))
    .catch(next);
});

router.post("/ticket/:ticketId/comment", (req, res, next) => {
  Comment.create({
    text: req.body.text,
    ticketId: req.params.ticketId
  })
    .then(comment => res.json(comment))
    .catch(err => next(err));
});

module.exports = router;
