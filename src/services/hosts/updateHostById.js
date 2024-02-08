// service/Hosts/updateHostById.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const updateHostById = async (id, data) => {
  const host = await prisma.host.update({
    where: { id },
    data,
  });
  return host;
};

export default updateHostById;
