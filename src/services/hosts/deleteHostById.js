// service/Hosts/deleteHostById.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const deleteHostById = async (id) => {
  const host = await prisma.host.delete({
    where: { id },
  });
  return host;
};

export default deleteHostById;
