// service/Amenity/createAmenity.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createAmenity = async (data) => {
  const amenity = await prisma.amenity.create({ data });
  return amenity;
};

export default createAmenity;
