import { SetMetadata } from '@nestjs/common';

export const Access = (module: string, level: string) =>
  SetMetadata('access', { module, level });