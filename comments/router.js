const { Router } = require("express");
const Comment = require("./model");
const router = new Router();

router.get("/comment", (req, res, next) => {
  Comment.findAll()
    .then(comment => res.json(comment))
    .catch(next);
});

// router.post("ticket/:ticketId/comment", (req, res, next) => {
//   Comment.create({
//     post: req.body.post,
//     text: req.body.text,
//     ticketId: req.params.ticketId
//     // author: req.body.author
//   })
//     .then(comment => res.json(comment))
//     .catch(err => next(err));
// });

router.post("/ticket/:ticketId/comment", (req, res, next) => {
  Comment.create({
    post: req.body.post,
    text: req.body.text,
    ticketId: req.params.ticketId
  })
    .then(comment => res.json(comment))
    .catch(err => next(err));
});

module.exports = router;
