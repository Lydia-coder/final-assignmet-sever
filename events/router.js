const { Router } = require("express");
const Event = require("./model");
const Ticket = require("../tickets/model");
const User = require("../user/model");
const auth = require("../auth/middelWare");
const jwt = require("jsonwebtoken");

const router = new Router();

router.get("/page", (req, res, next) => {
  //http://localhost:4000/page?limit=9&offset=9

  const limit = req.query.limit || 9;
  const offset = req.query.offset || 0;

  Event.findAll({
    limit: limit,
    offset: offset,
    include: [Ticket, User]
  })
    .then(event => {
      res.send(event);
    })
    .catch(next);
});

router.post("/events", auth, (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const userId = jwt.decode(token).userId;

  Event.create({
    image: req.body.image,
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    userId: userId
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

router.put("/event/:id", (req, res, next) => {
  Event.findByPk(req.params.id)
    .then(event => {
      if (!event) {
        return res.status(404).json({
          message: `Event does not exist`
        });
      }
      return Event.update(req.body).then(event => res.json(event));
    })
    .catch(error => next(error));
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
