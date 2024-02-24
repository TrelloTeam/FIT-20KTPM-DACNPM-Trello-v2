import { applyDecorators, Controller } from '@nestjs/common';

import { SwaggerController } from './swagger.decorator';

export function InjectController({ name = '', isCore = false }: { name: string; isCore?: boolean }) {
  return applyDecorators(SwaggerController(name), Controller(!isCore ? name : ''));
}
