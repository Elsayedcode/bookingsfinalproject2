import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getHosts = async (name) => {
  return await prisma.host.findMany({
    where: {
      name: {
        contains: name,
        //mode: 'insensetive',
      },
    },
    include: {
      listings: true,
    },
  });
};

export default getHosts;