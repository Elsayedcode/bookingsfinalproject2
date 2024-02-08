// service/Hosts/getHostById.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getHostById = async (id) => {
  const host = await prisma.host.findUnique({
    where: { id },
  });
  return host;
};

export default getHostById;
