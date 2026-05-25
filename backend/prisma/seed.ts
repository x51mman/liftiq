import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  await prisma.module.upsert({
    where: { code: 'USERS' },
    update: {},
    create: {
      code: 'USERS',
      name: 'Users module',
    },
  })

  console.log('🌱 SEED DONE')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })