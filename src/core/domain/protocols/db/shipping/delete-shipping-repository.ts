export abstract class IDbDeleteShippingRepository {
  abstract delete(id: string): Promise<void>;
}
