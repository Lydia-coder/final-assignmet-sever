const { Router } = require("express");
const Ticket = require("./model");
const Event = require("../events/model");
const Comment = require("../comments/model");
const router = new Router();

router.get("/ticket", (req, res, next) => {
  Ticket.findAll()
    .then(ticket => res.json(ticket))
    .catch(next);
});

router.get("/event/:eventId/ticket", (req, res, next) => {
  Ticket.findAll({ where: { eventId: req.params.eventId } })
    .then(ticket => res.json(ticket))
    .catch(err => next(err));
});
// router.get("/ticket/:id", (req, res, next) => {
//   Ticket.findByPk(req.params.id, { include: [Event] })
//     .then(ticket => res.json(ticket))
//     .catch(err => next(err));
// });

router.post("/event/:eventId/ticket", (req, res, next) => {
  Ticket.create({
    picture: req.body.picture,
    price: req.body.price,
    description: req.body.description,
    eventId: req.params.eventId

    // author: req.body.author
  })
    .then(event => res.json(event))
    .catch(err => next(err));
});

module.exports = router;
