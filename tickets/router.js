const { Router } = require("express");
const Ticket = require("./model");
const Event = require("../events/model");
const Comment = require("../comments/model");
const User = require("../user/model");
const auth = require("../auth/middelWare");
const jwt = require("jsonwebtoken");
const {
  getTickets,
  getAuthor,
  totalNumberOfTickets,
  getSingleTicketPrice,
  getEventId,
  fetchAllTickets,
  getAddedAt,
  getCommentCounts
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

router.get("/ticket/:ticketId", async (req, res, next) => {
  let risk = 0;
  let ticketObj = await getTickets(req.params.ticketId);
  let author = await getAuthor(req.params.ticketId);
  console.log(ticketObj, "what is there?????");
  // SELECT * FROM ticket WHERE id = req.params.ticketId
  //I want it to be a number/string, not an array or object
  author = author[0].userId;
  author = author.toString();
  //count the number of tickets of that author
  let numberOfTickets = await totalNumberOfTickets(author);

  //risk according to number of tickets owned by that user

  if (numberOfTickets == 1) {
    risk += 10;
  } else {
    risk += 0;
  }

  //find price of the ticket

  let ticketPrice = await getSingleTicketPrice(req.params.ticketId);

  ticketPrice = ticketPrice.price;

  //find eventId and all tickets of that event

  let eventId = await getEventId(req.params.ticketId);

  eventId = eventId.eventId;

  let allTickets = await fetchAllTickets(eventId);

  //count all tickets of that event( to calculate average price)

  let ticketsCount = allTickets.count;
  //calculate total price of all tickets related to that event

  ticketsPrices = allTickets.rows;

  ticketsPrices = ticketsPrices.map(ticket => {
    return ticket.price;
  });

  total = ticketsPrices.reduce((a, b) => a + b, 0);
  //calculate average price

  average = total / ticketsCount;

  //  risk based on difference between iprice and event average

  let variable = ticketPrice / average;

  if (variable < 1) {
    risk = risk + (100 - variable * 10);
  } else if (variable > 1) {
    let difference = ticketPrice - average;

    if (difference / average < 0.1) {
      risk = risk + (difference / average) * 10;
    } else {
      risk = risk + 10;
    }
  }

  //find when ticket was added

  let addedAt = await getAddedAt(req.params.ticketId);

  addedAt = addedAt.createdAt;

  addedAt = addedAt.toString();
  //2019-12-01 14:11:50 => ['2019-12-01', '14:11:50']
  addedAt = addedAt.split(" ");

  hours = addedAt[4];

  hours = hours.split(":");

  hours = hours[0];

  //risk for the time the ticket was added

  if (hours < 9 && hours > 17) {
    risk = risk + 10;
  } else {
    risk = risk - 10;
  }

  //find and count comments related to ticket

  let comments = await getCommentCounts(req.params.ticketId);

  //risk for number of comments

  if (comments > 3) {
    risk = risk + 5;
  }

  //risk range between 5 and 95

  if (risk < 5) {
    risk = 5;
  }

  if (risk > 95) {
    risk = 95;
  }

  //I want to return it as a string

  risk = risk.toString();

  ticketObj.risk = risk;
  console.log(ticketObj, "will you calculate?");

  res.status(201).json(ticketObj);
});

router.post("/event/:eventId/ticket", auth, (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const userId = jwt.decode(token).userId;
  let risk = 0;
  Ticket.create({
    price: req.body.price,
    description: req.body.description,
    eventId: req.params.eventId,
    userId: userId,
    risk: risk
  })

    .then(ticket => res.json(ticket))
    .catch(err => next(err));
  console.log(req.body.price, "why are you undifined?");
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

router.put("/ticket/:id", auth, (req, res, next) => {
  const token =
  req.headers.authorization && req.headers.authorization.split(" ")[1];
const userId = jwt.decode(token).userId;
  if (!req.params.id > 0) {
    res.status(404).end();
  }
  Ticket.findByPk(req.params.id)
    .then(ticket => ticket.update({price: req.body.price, description: req.body.description,userId:userId}))
    .then(ticket => res.send(ticket))
    .catch(next);
});

module.exports = router;
