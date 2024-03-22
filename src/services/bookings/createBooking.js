import { PrismaClient } from '@prisma/client';
import BadRequestError from "../../error/BadRequestError.js";

const prisma = new PrismaClient();

const createBooking = async ( userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus ) => {
  try {
    const ontbrekendeVelden = []
    if (!checkinDate) {
         ontbrekendeVelden.push('check-in date');
  }
  if (!checkoutDate) {
    ontbrekendeVelden.push('check-out Date');
}
if (!propertyId) {
  ontbrekendeVelden.push('propertyId');
}
if (!userId) {
  ontbrekendeVelden.push('userId');
}


if (!totalPrice) {
  ontbrekendeVelden.push('totalPrice');
}

if (!bookingStatus) {
  ontbrekendeVelden.push('bookingStatus');
}

  if (ontbrekendeVelden.length > 0) {
    throw new BadRequestError("one field is messing");
}
    const booking = await prisma.booking.create({
      data: {
        userId,
        propertyId, // Assuming a booking is for a single property
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      },
    });
    return booking;
  } catch (error) {
    // Handle or throw the error as appropriate for your application
    console.error('Error creating booking:', error);
    throw error;
  }
};

export default createBooking;
