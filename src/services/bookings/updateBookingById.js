import { PrismaClient } from "@prisma/client";

const updateBookingById = async (id, updatedBooking) => {
  const prisma = new PrismaClient();

  const { propertyId, userId, ...rest } = updatedBooking;

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

  return booking;
};

export default updateBookingById;
