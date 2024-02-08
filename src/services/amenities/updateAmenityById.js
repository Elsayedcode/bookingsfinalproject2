// service/Amenity/updateAmenityById.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updateAmenityById = async (id, data) => {
  const amenity = await prisma.amenity.update({
    where: { id },
    data,
  });
  return amenity;
};

export default updateAmenityById;
