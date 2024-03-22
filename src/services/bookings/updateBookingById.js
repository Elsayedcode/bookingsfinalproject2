import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../error/BadRequestError.js";

const prisma = new PrismaClient();

const updateBookingById = async (id, updatedBooking) => {
  

  const { propertyId, userId, ...rest } = updatedBooking;
  const ontbrekendeVelden = []

if (!id) {
  ontbrekendeVelden.push('id')
}

if (ontbrekendeVelden.length > 0) {
  console.log("ontbrekendeVelden:",ontbrekendeVelden)
  throw new BadRequestError(ontbrekendeVelden);
}
  // Here we can't use updateMany() because we need to update the createdBy and categories fields if it is passed
  const booking = await prisma.booking.update({
    where: { id },
    data: {
      ...rest,
      userId: userId
        ? {
            connect: { id: userId },
          }
        : undefined,
        propertyId: propertyId
        ? {
            set: propertyId.map((id) => ({ id })),
          }
        : undefined,
    },
  });

  if (!booking || booking.count === 0) {
    throw new NotFoundError("Booking", id);
}

  return booking;
};

export default updateBookingById;
