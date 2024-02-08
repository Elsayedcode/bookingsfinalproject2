// service/Amenity/getAmenityById.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAmenityById = async (id) => {
  const amenity = await prisma.amenity.findUnique({
    where: { id },
  });
  return amenity;
};

export default getAmenityById;
