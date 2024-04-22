export abstract class IDbDeleteOrderItemRepository {
  abstract delete(id: string): Promise<void>;
}
