// service/Hosts/createHost.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createHost = async (data) => {
  const host = await prisma.host.create({ data });
  return host;
};

export default createHost;
