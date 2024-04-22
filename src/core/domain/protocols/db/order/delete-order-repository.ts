export abstract class IDbDeleteOrderRepository {
  abstract delete(id: string): Promise<void>;
}
