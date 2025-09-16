import type { Plugin } from '@envelop/core';
import { GraphQLError } from 'graphql';
import { ContextType } from '../types';

type Options = {
  name: string;
  required?: boolean;
  errorMessage?: string | ((options: Omit<Options, 'errorMessage'>) => string);
  skipIntrospection?: boolean;
  value: string | string[];
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
      const query = body.query || '';
      if (isIntrospectionQuery(query) && skipIntrospection) {
        return;
      }

      if (!hasHeader && required) {
        throw new GraphQLError(errorMessageFn(options) || `${name} header is required`);
      }

      if (headerValue === null) {
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

function isIntrospectionQuery(query: string) {
  if (!query) return false;

  const introspectionKeywords = [
    '__schema',
    '__type',
    '__typename',
    '__Field',
    '__Directive',
    '__EnumValue',
    '__InputValue',
    '__TypeKind',
    'IntrospectionQuery',
  ];

  return introspectionKeywords.some(keyword => query.includes(keyword));
}
