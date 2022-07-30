import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

export const ApiSuccessResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          success: {
            type: 'boolean',
            default: true,
          },
        },
      },
    }),
  );
};
