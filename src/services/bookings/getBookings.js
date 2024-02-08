
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBookings = async (userId) => {
  const whereClause = {};

  if (userId) {
    whereClause.userId = userId; // Direct equality check
  }

  return await prisma.booking.findMany({
    where: whereClause
  });
};

export default getBookings;
