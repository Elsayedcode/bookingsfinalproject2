// service/Hosts/createHost.js
import { PrismaClient } from '@prisma/client';
import BadRequestError from "../../error/BadRequestError.js";

const prisma = new PrismaClient();

const createHost = async (username, password, name, email, phoneNumber, profilePicture, aboutMe) => {
  try {
    const ontbrekendeVelden = []
    if (!username) {
         ontbrekendeVelden.push('username');
  }
  if (!password) {
    ontbrekendeVelden.push('password');
}
if (!name) {
  ontbrekendeVelden.push('name');
}
if (!email) {
  ontbrekendeVelden.push('email');
}

if (!phoneNumber) {
  ontbrekendeVelden.push('phoneNumber');
}

if (!profilePicture) {
  ontbrekendeVelden.push('profilePicture');
}

if (!aboutMe) {
  ontbrekendeVelden.push('aboutMe');
}
  if (ontbrekendeVelden.length > 0) {
    throw new BadRequestError("one field is messing");
}
  const host = await prisma.host.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    }
  });
  return host;
} catch (error) {
  // Handle or throw the error as appropriate for your application
  console.error('Error creating booking:', error);
  throw error;
};
};

export default createHost;
