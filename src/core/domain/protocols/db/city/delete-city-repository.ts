export abstract class IDbDeleteCityRepository {
  abstract delete(id: string): Promise<void>;
}
