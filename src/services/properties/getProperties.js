
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getProperties = async ({ location, pricePerNight, amenities }) => {
  const whereClause = {
    ...(location && { location }),
    ...(pricePerNight && { pricePerNight: { equals: parseFloat(pricePerNight) } }), // Ensure pricePerNight is correctly parsed as a float
  };

  // Conditionally add the amenities filter if amenities are provided and not empty
  if (amenities && amenities.length > 0) {
    whereClause.amenities = {
      some: {
        name: { in: amenities }, // Use 'in' to match any of the provided amenity names
      },
    };
  }

  return await prisma.property.findMany({
    where: whereClause,
    include: {
      amenities: true,
    },
  });
};

export default getProperties;

