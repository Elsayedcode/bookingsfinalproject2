
import { PrismaClient } from "@prisma/client";
import bookingsData from "../src/data/bookings.json" assert { type: "json" };
import propertiesData from "../src/data/properties.json" assert { type: "json" };
import hostsData from "../src/data/hosts.json" assert { type: "json" };
import amenitiesData from "../src/data/amenities.json" assert { type: "json" };
import usersData from "../src/data/users.json" assert { type: "json" };
import reviewsData from "../src/data/reviews.json" assert { type: "json" };
import bcrypt from 'bcrypt';


const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { bookings } = bookingsData;
  const { hosts } = hostsData;
  const { properties } = propertiesData;
  const { amenities } = amenitiesData;
  const { reviews } = reviewsData;
  const { users } = usersData;
  const saltRounds = 10; // You can adjust the salt rounds as needed

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
  
  // Assuming `users` is an array of user objects you've parsed from your JSON data
  for (const user of users) {
    // Hash the password before the upsert operation
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        username: user.username,
        email: user.email,
        name: user.name,
        password: hashedPassword, // Use the hashed password for the update
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
      },
      create: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        password: hashedPassword, // Use the hashed password for the create
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
      },
    });
  }

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
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


main()
.then(async () => {
  await prisma.$disconnect();
})
.catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
