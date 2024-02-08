import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createProperty = async (data) => {
  try {
    const { hostId, title, description, location, pricePerNight, bedRoomCount, bathRoomCount, maxGuestCount, rating, amenityIds } = data;

    // Validation logic here (if needed)

    const property = await prisma.property.create({
      data: {
        hostId,
        title,
        description,
        location,
        pricePerNight,
        bedRoomCount,
        bathRoomCount,
        maxGuestCount,
        rating,
        amenities: amenityIds && amenityIds.length > 0 ? {
          connect: amenityIds.map(id => ({ id })),
        } : undefined,
      },
    });

    return property;
  } catch (error) {
    console.error('Error creating property:', error);
    // Handle or rethrow the error as appropriate for your application
    throw error;
  }
};

export default createProperty;
