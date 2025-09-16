import { v4 as uuid } from 'uuid';
import type { Plugin } from '@envelop/core';
import type { ContextType } from '@/types';

export const buildHeaders = (): Plugin<ContextType> => {
  return {
    onParse({ context, extendContext }) {
      const requestId = uuid();
      extendContext({
        requestId: requestId,
        client: context.request.headers.get('client') || '',
      });
    },
  };
};
