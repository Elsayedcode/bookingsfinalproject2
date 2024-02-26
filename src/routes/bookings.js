
// Import your booking service functions
import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import createBooking from "../services/bookings/createBooking.js";
import getBookingById from "../services/bookings/getBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import auth from "../middleware/auth.js";


const router = Router();

// POST /bookings - Create a new booking
router.post('/',  async (req, res) => {
    try {
        console.log("booking test")
        const bookingData = req.body;
        console.log(bookingData)
        const { userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus} = req.body;
        const newBooking = await createBooking(userId,
            propertyId,
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /bookings?userId=...
router.get('/', async (req, res) => {
    try {
      const userId = req.query.userId;
      const bookings = await getBookings({ userId });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// GET /bookings/:id - Get a booking by ID
router.get('/:id', async (req, res) => {
    try {
        const booking = await getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /bookings/:id - Update a booking by ID
router.put('/:id', auth, async (req, res) => {
    try {
        const booking = await updateBookingById(req.params.id, req.body);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /bookings/:id - Delete a booking by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const result = await deleteBookingById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
