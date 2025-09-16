import db from '../../db';
import { Address, Args, ArgsAddAddress } from './types';
import { GraphQLError } from 'graphql';

const _getAddress = (username: string): Promise<Address | null> => {
  return db.tables.addresses.get(username);
};

export const getAddress = async (_: any, args: Args, context: any): Promise<Address> => {
  context.logger.info('getAddress', 'Enter resolver');
  const address = await _getAddress(args.username);
  if (address) {
    context.logger.info('getAddress', 'Returning address');
    return address;
  }
  context.logger.error('getAddress', 'No address found');
  throw new GraphQLError('No address found in getAddress resolver');
};

const _addAddress = (username: string, address: Address): Promise<Address> => {
  return db.tables.addresses.insert(username, address);
};

export const addAddress = async (_: any, args: ArgsAddAddress, context: any): Promise<Address> => {
  context.logger.info('addAddress', 'Enter resolver');
  const address = await _addAddress(args.username, args.address);
  context.logger.info('addAddress', 'Returning address');
  return address;
};
