const Ticket = require("../tickets/model");
const Comment = require("../comments/model");

exports.getTickets = async ticketId => {
  const ticketObj = await Ticket.findOne({
    where: { id: ticketId }
  }).catch(err => next(err));

  return ticketObj;
};

exports.getAuthor = async ticketId => {
  let author = await Ticket.findAll({
    where: { id: ticketId },

    attributes: ["userId"],

    raw: false
  }).catch(err => next(err));
  return author;
};

exports.totalNumberOfTickets = async authorId => {
  let tickets = await Ticket.count({
    where: { userId: authorId }
  }).catch(err => next(err));
  return tickets;
};

exports.getSingleTicketPrice = async ticketId => {
  let singleTicketPrice = await Ticket.findOne({
    where: { id: ticketId },
    attributes: ["price"]
  }).catch(err => next(err));
  return singleTicketPrice;
};

exports.getEventId = async ticketId => {
  let getEventId = await Ticket.findOne({
    where: { id: ticketId },
    attributes: ["eventId"]
  }).catch(err => next(err));
  return getEventId;
};

exports.fetchAllTickets = async eventId => {
  let getAllTickets = await Ticket.findAndCountAll({
    where: { eventId: eventId },
    attributes: ["price"]
  }).catch(err => next(err));
  return getAllTickets;
};

exports.getAddedAt = async ticketId => {
  let addedTimestamp = await Ticket.findOne({
    where: { id: ticketId },
    attributes: ["createdAt"]
  }).catch(err => next(err));
  return addedTimestamp;
};

exports.getCommentCounts = async ticketId => {
  let commentsCounts = await Comment.count({
    where: { ticketId: ticketId }
  }).catch(err => next(err));
  return commentsCounts;
};
