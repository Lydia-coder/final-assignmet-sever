const calculateRisk = (
  authTicket,
  averageTicketPrice,
  createdAt,
  ticketComments,
  price
) => {
  console.log(
    authTicket,
    averageTicketPrice,
    createdAt,
    ticketComments,
    price,
    "====="
  );
  let ticketRisk = 0;
  price = Number(price);
  ticketComments = Number(ticketComments);
  if (authTicket === 1) ticketRisk = ticketRisk + 10;
  if (price < averageTicketPrice) {
    const percent = ((averageTicketPrice - price) / averageTicketPrice) * 100;
    ticketRisk = ticketRisk - percent;
  } else {
    const percent = ((averageTicketPrice - price) / averageTicketPrice) * 100;
    const higerPercent = percent > averageTicketPrice ? percent : 10;

    ticketRisk = ticketRisk - higerPercent;
  }

  const businesshours = new Date(createdAt).getHours();
  if (businesshours > 9 && businesshours < 17) {
    return (ticketRisk = ticketRisk - 10);
  } else {
    ticketRisk = ticketRisk + 10;
  }

  if (ticketComments > 3) {
    ticketRisk = ticketRisk + 10;
  }
  if (ticketRisk < 5) ticketRisk = 5;
  if (ticketRisk > 95) ticketRisk = 95;

  return ticketRisk;
};

const calculateAveragePrice = tickets => {
  let sum = 0;
  tickets.map(data => {
    sum += data.dataValues.comments.length;
  });

  return sum / tickets.length;
};

const calculateCommentLength = data => {
  console.log(data.rows[0].dataValues.comments.length, "my data ====");
  let sum = 0;
  data.rows.map(res => {
    sum += res.dataValues.comments ? res.dataValues.comments.length : 0;
  });

  return sum;
};

module.exports = {
  calculateAveragePrice,
  calculateRisk,
  calculateCommentLength
};
// const onlyTicket =(authTicket) =>{
//     let ticketRisk= 0
//     if(authTicket.length === 1){
//       return ticketRisk = ticketRisk + 10
//     }else{
//     return ticketRisk
//    }
// //if the ticket is the only ticket of the author, add 10%

//  //if the ticket price is lower than the average ticket price for that event, that's a risk
//  //if a ticket is X% cheaper than the average price, add X% to the risk

//  const lowerPrice = (price,averageTp) =>{
//  let ticketRisk = 0
//  if(price < averageTp){
//   const percent=((averageTp - price)/averageTp)*100
//   retrun ticketRisk=ticketRisk + percent
//  }
//   }
//   let tickeRisk=0
//   const percent=((averageTp - price)/averageTp)*100
//   if(percent <10){
// return tickeRisk=tickeRisk +10
//   }

// // * if the ticket was added during business hours (9-17), deduct 10% from the risk, if not, add 10% to the risk

// let ticketRiks=0
// const businessH= new Date(createdAt).getHours()
// if(businessH > 9 && businessH < 17){
// return tickeRiskt=ticketRisk - 10
// }else{
//   return ticketRisk=ticketRisk +10
// }

// // * if there are >3 comments on the ticket, add 5% to the risk

// let ticketRisk= 0
// let comments= 0
// if(comments > 3){
//   return ticketRisk= ticketRisk +5
// }

// // The minimal risk is 5% (there's no such thing as no risk) and the maximum risk is 95%.

// let ticketRisk=0
// if(tickeRisk =< 5){
//   return tickeRisk= tickeRisk +5
// }
// let ticketRisk=0
// if(tickeRisk => 95){
//   return tickeRisk= tickeRisk +95
// }
// // ?? not sure if this is correct
