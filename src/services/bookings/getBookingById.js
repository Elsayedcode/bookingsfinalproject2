import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../error/BadRequestError.js";

const prisma = new PrismaClient();

const getBookingById = async (id) => {
  
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  return booking;
};

export default getBookingById;