export interface Table<T> {
  get(key: string): Promise<T | null>;
  insert(key: string, value: T): Promise<T>;
  // update(key: string, value: T): Promise<void>;
  // delete(key: string): Promise<void>;
  // getAll(): Promise<T[]>;
}
