// Service/properties/getPropertyById.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getPropertyById = async (id) => {
  const property = await prisma.property.findUnique({
    where: { id },
  });
  return property;
};

export default getPropertyById;
