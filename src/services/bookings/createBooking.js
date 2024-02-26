import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createBooking = async ( userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus ) => {
  try {
    const booking = await prisma.booking.create({
      data: {
        user: { connect: { id: userId } },
        property: { connect: { id: propertyId } }, // Assuming a booking is for a single property
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
