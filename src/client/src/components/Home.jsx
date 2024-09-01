import React, { useState, useEffect } from "react";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Home() {
  const [movie, setMovie] = useState("");
  const [slot, setslot] = useState("");
  const [seats, setSeats] = useState({
    A1: 0,
    A2: 0,
    A3: 0,
    A4: 0,
    D1: 0,
    D2: 0,
  });
  const [lastBooking, setLastBooking] = useState(null);

  const handleSeatChange = (e) => {
    setSeats({ ...seats, [e.target.name]: e.target.value });
  };

  const handleMovieChange = (movie) => {
    setMovie(movie);
  };

  const handleslotChange = (slot) => {
    setslot(slot);
  };

  const handleSubmit = async () => {
    const bookingData = {
      movie,
      slot,
      seats,
    };

    try {
      const response = await axios.post(
        "https://bookmyshow-backend-uxqr.onrender.com/api/booking",
        bookingData
      );
      toast.success("Booking successful!");
    } catch (error) {
      toast.error("Error booking. Please try again.", error);
    }
  };

  useEffect(() => {
    const fetchLastBooking = async () => {
      try {
        const response = await axios.get(
          "https://bookmyshow-backend-uxqr.onrender.com/api/lastbooking"
        );
        setLastBooking(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error("Error fetching last booking");
      }
    };

    fetchLastBooking();
  }, []);

  return (
    <div>
      <form>
        <h3>Book that show!!</h3>

        <div className="movie-row" name="movie" value="bookingData.name">
          <h4>Select a Movie</h4>
          <div
            className={`movie-column ${
              movie === "Suraj par mangal bhari" ? "selected" : ""
            }`}
            onClick={() => handleMovieChange("Suraj par mangal bhari")}
          >
            <h6> Suraj par mangal bhari</h6>
          </div>
          <div
            className={`movie-column ${movie === "Tenet" ? "selected" : ""}`}
            onClick={() => handleMovieChange("Tenet")}
          >
            <h6>Tenet</h6>
          </div>
          <div
            className={`movie-column ${
              movie === "The war with grandpa" ? "selected" : ""
            }`}
            onClick={() => handleMovieChange("The war with grandpa")}
          >
            <h6>The war with grandpa</h6>
          </div>
          <div
            className={`movie-column ${
              movie === "The personal history of David Copperfield"
                ? "selected"
                : ""
            }`}
            onClick={() =>
              handleMovieChange("The personal history of David Copperfield")
            }
          >
            <h6>The personal history of David Copperfield</h6>
          </div>
          <div
            className={`movie-column ${
              movie === "Come Play" ? "selected" : ""
            }`}
            onClick={() => handleMovieChange("Come Play")}
          >
            <h6>Come Play</h6>
          </div>
        </div>

        <div className="slot-row" name="slot" value="bookingData.name">
          <h4>Select a Time Slot</h4>
          <div
            className={`slot-column ${slot === "10:00 AM" ? "selected" : ""}`}
            onClick={() => handleslotChange("10:00 AM")}
          >
            <h6>10:00 AM</h6>
          </div>
          <div
            className={`slot-column ${slot === "01:00 PM" ? "selected" : ""}`}
            onClick={() => handleslotChange("01:00 PM")}
          >
            <h6>01:00 PM</h6>
          </div>
          <div
            className={`slot-column ${slot === "03:00 PM" ? "selected" : ""}`}
            onClick={() => handleslotChange("03:00 PM")}
          >
            <h6>03:00 PM</h6>
          </div>
          <div
            className={`slot-column ${slot === "08:00 PM" ? "selected" : ""}`}
            onClick={() => handleslotChange("08:00 PM")}
          >
            <h6>08:00 PM</h6>
          </div>
        </div>

        <div className="seat-row">
          <h4>Select the Seats</h4>
          {Object.keys(seats).map((seatType) => (
            <div
              className={`seat-column ${seats[seatType] > 0 ? "selected" : ""}`}
              key={seatType}
            >
              <h6>Type {seatType}</h6>
              <input
                type="number"
                name={seatType}
                value={seats[seatType]}
                onChange={handleSeatChange}
                min="0"
              />
            </div>
          ))}
        </div>

        <button className="book-button" type="button" onClick={handleSubmit}>
          Book Now
        </button>
      </form>
      <div className="last-order">
        <h4>Last Booking Details</h4>
        {lastBooking ? (
          <div>
            <p>
              <strong>Movie:</strong> {lastBooking.movie}
            </p>
            <p>
              <strong>Slot:</strong> {lastBooking.slot}
            </p>

            {Object.keys(lastBooking.seats).map((seatType) =>
              lastBooking.seats[seatType] ? (
                <p>
                  <strong>Seats {seatType}</strong> : {lastBooking.seats[seatType]}
                </p>
              ) : (
                ""
              )
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default Home;
