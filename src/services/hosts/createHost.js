// service/Hosts/createHost.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createHost = async (username, password, name, email, phoneNumber, profilePicture, aboutMe) => {
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
};

export default createHost;
