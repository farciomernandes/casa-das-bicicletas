export abstract class IDbDeleteStateRepository {
  abstract delete(id: string): Promise<void>;
}
