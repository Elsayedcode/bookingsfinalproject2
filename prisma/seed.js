
import { PrismaClient } from "@prisma/client";
import bookingsData from "../src/data/bookings.json" assert { type: "json" };
import propertiesData from "../src/data/properties.json" assert { type: "json" };
import hostsData from "../src/data/hosts.json" assert { type: "json" };
import amenitiesData from "../src/data/amenities.json" assert { type: "json" };
import usersData from "../src/data/users.json" assert { type: "json" };
import reviewsData from "../src/data/reviews.json" assert { type: "json" };


const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { bookings } = bookingsData;
  const { hosts } = hostsData;
  const { properties } = propertiesData;
  const { amenities } = amenitiesData;
  const { reviews } = reviewsData;
  const { users } = usersData;

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {title: property.title,
        description: property.description,
        location: property.location,
        pricePerNight: property.pricePerNight,
        bedRoomCount: property.bedRoomCount,
        bathRoomCount: property.bathRoomCount,
        maxGuestCount: property.maxGuestCount,
        rating: property.rating,},
      
      create: property,
    });
  }

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }




  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: {
        id: booking.id,
        checkinDate: new Date(booking.checkinDate),
        checkoutDate: new Date(booking.checkoutDate),
        numberOfGuests: booking.numberOfGuests, // Ensure the field name matches the model
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,
        user: { // Assuming the relation field is named 'user'
          connect: { id: booking.userId }, // No map needed, directly connect the userId
        },
        property: { // Assuming the relation field is named 'property'
          connect: { id: booking.propertyId },
        },
      },
    });
  };
}
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   })};



main()
.then(async () => {
  await prisma.$disconnect();
})
.catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
