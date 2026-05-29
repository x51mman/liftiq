import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  // MODULES

  const usersModule = await prisma.module.upsert({
    where: { code: 'USERS' },
    update: {},
    create: {
      code: 'USERS',
      name: 'Users module',
    },
  })

  const auditModule = await prisma.module.upsert({
    where: { code: 'AUDIT' },
    update: {},
    create: {
      code: 'AUDIT',
      name: 'Audit module',
    },
  })

  /*
  // DEFAULT COMPANY
  // csak DEV environmentben szokás

  const company = await prisma.company.upsert({
    where: {
      taxNumber: 'DEV',
    },

    update: {},

    create: {
      name: 'Development Company',
      taxNumber: 'DEV',
    },
  })

  // ROLES

  const adminRole = await prisma.role.upsert({
    where: {
      companyId_code: {
        companyId: company.id,
        code: 'ADMIN',
      },
    },

    update: {},

    create: {
      companyId: company.id,
      code: 'ADMIN',
      name: 'Administrator',
    },
  })

  // PERMISSIONS

  // USERS
  await prisma.rolePermission.upsert({
    where: {
      roleId_moduleId: {
        roleId: adminRole.id,
        moduleId: usersModule.id,
        accessLevel: 'write',
      },
    },

    update: {},

    create: {
      roleId: adminRole.id,
      moduleId: usersModule.id,
      accessLevel: 'write',
    },
  })

  // AUDIT
  await prisma.rolePermission.upsert({
    where: {
      roleId_moduleId: {
        roleId: adminRole.id,
        moduleId: auditModule.id,
        accessLevel: 'read',
      },
    },

    update: {},

    create: {
      roleId: adminRole.id,
      moduleId: auditModule.id,
      accessLevel: 'read',
    },
  })

*/

  console.log('🌱 SEED DONE')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })