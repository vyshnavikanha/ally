import { GraphQLError } from 'graphql';
import type { Plugin } from '@envelop/core';
import type { ContextType } from '@/types';

export const ANY_VALUE = Symbol();

type Options = {
  name: string;
  required?: boolean;
  errorMessage?: string | ((options: Omit<Options, 'errorMessage'>) => string);
  skipIntrospection?: boolean;
  value: Symbol | string | string[];
};

export const useHeaderValidator = (options: Options): Plugin<ContextType> => {
  const { name, required = false, errorMessage, skipIntrospection = false, value } = options;

  const errorMessageFn = typeof errorMessage === 'function' ? errorMessage : () => errorMessage;

  return {
    onContextBuilding: async ({ context }) => {
      const request = context.request;
      const headerValue = context.request.headers.get(name);
      const hasHeader = context.request.headers.has(name);

      if (!hasHeader && !required) {
        return;
      }

      const clonedRequest = request.clone();
      const body = await clonedRequest.json();
      if (body.operationName === 'IntrospectionQuery' && skipIntrospection) {
        return;
      }

      if (!hasHeader && required) {
        throw new GraphQLError(errorMessageFn(options) || `${name} header is required`);
      }

      if (headerValue === null || value === ANY_VALUE) {
        return;
      }

      if (typeof value === 'string' && headerValue !== value) {
        throw new GraphQLError(errorMessageFn(options) || `invalid ${name} header value`);
      }

      if (Array.isArray(value) && !value.includes(headerValue)) {
        throw new GraphQLError(errorMessageFn(options) || `invalid ${name} header value`);
      }
    },
  };
};
