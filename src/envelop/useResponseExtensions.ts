import type { ExecutionResult, Plugin } from '@envelop/core';
import type { ContextType } from '../types';

export const useResponseExtensions = (): Plugin<ContextType> => ({
  onExecute: ({ context }) => {
    return {
      onExecuteDone: ({ result }) => {
        if (!isExecutionResult(result)) {
          return;
        }
        //  Correct way to add additional fields to the response
        // result.extensions = {
        //   ...result.extensions,
        //   requestId: context.requestId,
        // };

        //  Non-standard way to add additional fields to the response
        (result as any).metadata = {
          ...(result as any).metadata,
          requestId: context.requestId,
        };
      },
    };
  },
});

function isExecutionResult(result: any): result is ExecutionResult {
  return result && typeof result === 'object' && !(Symbol.asyncIterator in result);
}
