import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit
{
  constructor() {
    super()

    this.$use(async (params, next) => {

      if (
        params.action === 'findMany' ||
        params.action === 'findFirst'
      ) {

        params.args = params.args || {}

        params.args.where = {
          deletedAt: null,
          ...(params.args.where || {})
        }
      }

      return next(params)
    })
  }

  async onModuleInit() {
    await this.$connect()
  }
}