

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getHosts = async (username) => {
  return await prisma.host.findMany({
    where: {
      username: {
        contains: username,
      },
    },
    include: {
      listings: true,
    },
  });
};

export default getHosts;
