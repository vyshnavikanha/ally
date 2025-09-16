import { getAddress, addAddress } from './address/address';
import type { Address, Args, ArgsAddAddress } from './address/types';

export const resolvers = {
  Query: {
    address: (parent: any, args: Args, context: any, info: any): Promise<Address> => {
      return getAddress(parent, args, context);
    },
  },
  Mutation: {
    addAddress: (parent: any, args: ArgsAddAddress, context: any, info: any): Promise<Address> => {
      return addAddress(parent, args, context);
    },
  },
};
