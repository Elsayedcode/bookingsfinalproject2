
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

  
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }
  
  // First, ensure all users are seeded
for (const user of users) {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  await prisma.user.upsert({
    where: { id: user.id },
    update: {
      username: user.username,
      email: user.email,
      name: user.name,
      password: hashedPassword,
      phoneNumber: user.phoneNumber,
      profilePicture: user.profilePicture,
    },
    create: {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      password: hashedPassword,
      phoneNumber: user.phoneNumber,
      profilePicture: user.profilePicture,
    },
  });
}

// Then seed properties
for (const property of properties) {
  console.log("property:", property)  
  await prisma.property.upsert({
    where: { id: property.id },
    update: {},
    create: property,
  });
}

// After properties, you can seed bookings
for (const booking of bookings) {
  await prisma.booking.upsert({
    where: { id: booking.id },
    update: {},
    create: {
      id: booking.id,
      checkinDate: new Date(booking.checkinDate),
      checkoutDate: new Date(booking.checkoutDate),
      numberOfGuests: booking.numberOfGuests,
      totalPrice: booking.totalPrice,
      bookingStatus: booking.bookingStatus,
      user: {
        connect: { id: booking.userId },
      },
      property: {
        connect: { id: booking.propertyId },
      },
    },
  });
}

// Continue with other entities as before...

  
  
  
  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }

  

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }
  

  
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
