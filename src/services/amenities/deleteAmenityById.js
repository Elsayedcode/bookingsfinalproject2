// service/Amenity/deleteAmenityById.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const deleteAmenityById = async (id) => {
  const amenity = await prisma.amenity.delete({
    where: { id },
  });
  return amenity;
};

export default deleteAmenityById;
