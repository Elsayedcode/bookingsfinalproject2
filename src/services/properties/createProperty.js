import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../error/BadRequestError.js";

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
  amenities,
}) => {
  try {
    console.log("property cheeeeeeeeeeeeeeeeeeck");
    const ontbrekendeVelden = [];
    if (!hostId) {
      ontbrekendeVelden.push("hostId");
    }
    if (!title) {
      ontbrekendeVelden.push("title");
    }
    if (!description) {
      ontbrekendeVelden.push("description");
    }

    if (!location) {
      ontbrekendeVelden.push("location");
    }

    if (!pricePerNight) {
      ontbrekendeVelden.push("pricePerNight");
    }

    if (!bedroomCount) {
      ontbrekendeVelden.push("bedroomCount");
    }

    if (!bathRoomCount) {
      ontbrekendeVelden.push("bathRoomCount");
    }
    if (!maxGuestCount) {
      ontbrekendeVelden.push("maxGuestCount");
    }

    if (!rating) {
      ontbrekendeVelden.push("rating");
    }

    // if (!amenities) {
    //   ontbrekendeVelden.push("amenities");
    // }
    if (ontbrekendeVelden.length > 0) {
      console.log("ontbrekendeVelden:",ontbrekendeVelden)
      throw new BadRequestError("one field is messing");
    }
    console.log("check property fout");
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
    console.log("check fout bij propery", property);
    return property;
  } catch (error) {
    console.error("Error creating property:", error);
    throw error; // or handle error as appropriate
  }
};
export default createProperty;
