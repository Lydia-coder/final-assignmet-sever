const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const User = require("./user/model");
const Event = require("./events/model");
const Ticket = require("./tickets/model");
const Comment = require("./comments/model");
const userRouter = require("./user/router");
const authRouter = require("./auth/router");
const eventsRouter = require("./events/router");
const ticketRouter = require("./tickets/router");
const commentRouter = require("./comments/router");
const port = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(authRouter);
app.use(eventsRouter);
app.use(ticketRouter);
app.use(commentRouter);

app.get("/", (req, res, next) => {
  res.send("hello");
});
app.listen(port, () => console.log(`listening to ${port}`));
