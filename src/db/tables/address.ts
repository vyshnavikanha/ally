import fs from 'node:fs/promises';
import path from 'node:path';
import { GraphQLError } from 'graphql';

import { Table } from './types';
import { Address, Addresses } from '../../schema/address/types';

class AddressTable implements Table<Address> {
  private filePath = path.join(process.cwd(), 'data/addresses.json');

  private async getAddresses() {
    const data = await fs.readFile(this.filePath, { encoding: 'utf8', flag: 'r' });
    return JSON.parse(data) as Addresses;
  }

  async get(key: string) {
    const addresses = await this.getAddresses();
    return addresses[key] ?? null;
  }

  async insert(key: string, value: Address) {
    const addresses = await this.getAddresses();
    if (addresses[key]) {
      throw new GraphQLError(`An address already exists for ${key}`);
    }
    addresses[key] = value;
    await fs.writeFile(this.filePath, JSON.stringify(addresses, null, 2), { encoding: 'utf8', flag: 'w' });
    return value;
  }
}

const addresses = new AddressTable();

export default addresses;
