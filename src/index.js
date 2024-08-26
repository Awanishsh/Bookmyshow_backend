const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const path = require("path");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { connection } = require("./connector");
const cors = require("cors");

app.use(cors());




app.post("/api/booking", async (req, res) => {
  const  bookingData = req.body;

  const booking = new connection(bookingData);
  try {
    await booking.save();
    res.status(200).send(booking);
    
  } catch (error) {
    res.status(400).send(error);
  }
 

});
app.get("/api/lastbooking", async (req, res) => {
  try {
    const lastBooking = await connection.findOne().sort({ _id: -1 });
    if (!lastBooking) return res.status(404).send("No bookings found");
    res.status(200).send(lastBooking);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
