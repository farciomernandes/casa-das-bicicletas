export abstract class IDbDeleteAddressRepository {
  abstract delete(id: string): Promise<void>;
}
