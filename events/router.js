const { Router } = require("express");
const Event = require("./model");
const Ticket = require("../tickets/model");
const User = require("../user/model");

const router = new Router();

// router.get("/events", (req, res, next) => {
//   Event.findAll()
//     .then(event => res.json(event))
//     .catch(next);
// });

router.post("/events", (req, res, next) => {
  Event.create({
    image: req.body.image,
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  })
    .then(event => res.json(event))
    .catch(err => next(err));
});
router.get("/event", (req, res, next) => {
  Event.findAll({ include: [Ticket, User] })
    .then(event => res.json(event))
    .catch(next);
});

router.get("/events/:eventId", (req, res, next) => {
  Event.findByPk(req.params.eventId)
    .then(event => res.json(event))
    .catch(err => next(err));
});

router.delete("/events/:eventId", (req, res, next) => {
  Event.destroy({
    where: {
      id: parseInt(req.params.eventId)
    }
  })
    .then(number => res.send({ number }))
    .catch(next);
});
// router.post("/events/:eventsId/tickets", (req, res, next) => {
//   const { eventId } = req.params;
//   Ticket.create({
//     picture: req.body.picture,
//     price: req.body.price,
//     description: req.body.description,
//     eventId: event.id
//   })

//     .then(event => res.json(event))
//     .catch(err => next(err));
// });

module.exports = router;
