import { type Plugin, useEngine } from '@envelop/core';
import { parse, validate, specifiedRules, execute, subscribe } from 'graphql';
import { useParserCache } from '@envelop/parser-cache';
import { useValidationCache } from '@envelop/validation-cache';
import type { ContextType } from '@/types';

import { buildHeaders } from './buildHeaders';
import { useLogger } from './useLogger';
import { useHeaderValidator } from './useHeaderValidator';
import { useResponseExtensions } from './useResponseExtensions';

const plugins: Plugin<ContextType>[] = [
  useEngine({ parse, validate, specifiedRules, execute, subscribe }) as Plugin<ContextType>,
  buildHeaders(),
  useLogger(),
  useHeaderValidator({
    name: 'client',
    required: true,
    value: ['app', 'web', 'mobile-web'],
    skipIntrospection: true,
  }),
  useParserCache() as Plugin<ContextType>,
  useValidationCache() as Plugin<ContextType>,
  useResponseExtensions(),
];

export default plugins;
