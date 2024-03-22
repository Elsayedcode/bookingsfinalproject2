import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../error/BadRequestError.js";

const prisma = new PrismaClient();

const deleteBookingById = async (id) => {
  try {

    const ontbrekendeVelden = []

    if (!id) {
      ontbrekendeVelden.push('id');
    }
  
  
    if (ontbrekendeVelden.length > 0) {
      throw new BadRequestError("one field is missing");
  }
  
  const booking = await prisma.booking.deleteMany({
    where: { id },
  });

  return booking.count > 0 ? id : null;
} catch (error) {
  console.error("Error deleting booking:", error);
  throw error;
};
};

export default deleteBookingById;