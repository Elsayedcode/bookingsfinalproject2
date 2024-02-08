import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getProperties = async ({ location, pricePerNight, amenities }) => {
  const whereClause = {
    ...(location && { location }),
    ...(pricePerNight && { pricePerNight: { equals: pricePerNight } }), // Directly use the value
    ...(amenities && {
      amenities: {
        some: {
          name: amenities,
        },
      },
    }),
  };

  return await prisma.property.findMany({
    where: whereClause,
    include: {
      amenities: true,
    },
  });
};

export default getProperties;
