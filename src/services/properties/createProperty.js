
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createProperty = async ({
  hostId,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating,
  amenities
}) => {
  try {
    const property = await prisma.property.create({
      data: {
        hostId,
        title, // Make sure this field is provided, as your error indicated it was missing
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        rating,
        amenities, // Ensure this is correctly formatted for what Prisma expects
      },
    });
    return property;
  } catch (error) {
    console.error('Error creating property:', error);
    throw error; // or handle error as appropriate
  }
};

export default createProperty;

