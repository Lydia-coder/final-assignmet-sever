const { Router } = require("express");
const Ticket = require("./model");
const Event = require("../events/model");
const Comment = require("../comments/model");
const User = require("../user/model");
const auth = require("../auth/middelWare");
const router = new Router();

// add auth middelware

router.get("/ticket", (req, res, next) => {
  Ticket.findAll({ include: [Comment, User] })
    .then(ticket => res.json(ticket))
    .catch(next);
});

router.get("/event/:eventId/ticket", (req, res, next) => {
  Ticket.findAll({ where: { eventId: req.params.eventId } })
    .then(ticket => res.json(ticket))
    .catch(err => next(err));
});
router.get("/ticket/:ticketId", (req, res, next) => {
  Ticket.findOne({ where: { id: req.params.ticketId } })
    .then(ticket => {
      if (!ticket) {
        res / status(404).end();
      } else {
        res.status(201).json(ticket);
      }
    })
    .catch(next);
});

router.post("/event/:eventId/ticket", auth, (req, res, next) => {
  Ticket.create({
    price: req.body.price,
    description: req.body.description,
    eventId: req.params.eventId

    // author: req.body.author
  })
    .then(event => {
      res.json(event);
    })
    .catch(err => next(err));
});

router.delete("/ticket/:ticketId", (req, res, next) => {
  Ticket.destroy({
    where: {
      id: parseInt(req.params.ticketId)
    }
  })
    .then(number => res.send({ number }))
    .catch(next);
});

module.exports = router;
