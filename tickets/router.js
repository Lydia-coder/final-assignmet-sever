const { Router } = require("express");
const Ticket = require("./model");
const Event = require("../events/model");
const Comment = require("../comments/model");
const User = require("../user/model");
const auth = require("../auth/middelWare");
const jwt = require("jsonwebtoken");
const {
  calculateRisk,
  calculateAveragePrice,
  calculateCommentLength
} = require("../algorithm/logic");
const router = new Router();

// add auth middelware

router.get("/ticket", (req, res, next) => {
  Ticket.findAll({ include: [Comment, User] })
    .then(ticket => res.json(ticket))
    .catch(next);
});

router.get("/event/:eventId/ticket", (req, res, next) => {
  Ticket.findAll({
    where: { eventId: req.params.eventId }
  })
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
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const userId = jwt.decode(token).userId;

  let ticketCounts;
  let ticketComments;
  let averagePrice;
  const price = req.body.price;
  const date = new Date();

  Ticket.findAndCountAll({
    where: {
      userId
    },
    include: [Comment]
  }).then(result => {
    ticketComments = calculateCommentLength(result);
    ticketCounts = result.count;

    Ticket.findAll()
      .then(allTickets => {
        averagePrice = calculateAveragePrice(allTickets);
      })
      .then(() => {
        Ticket.create({
          price: req.body.price,
          description: req.body.description,
          eventId: req.params.eventId,
          userId: userId,
          ticketRisk: calculateRisk(
            ticketCounts,
            averagePrice,
            date,
            ticketComments,
            price
          )
        })
          .then(event => {
            res.json(event);
          })
          .catch(err => next(err));
      });
  });
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
