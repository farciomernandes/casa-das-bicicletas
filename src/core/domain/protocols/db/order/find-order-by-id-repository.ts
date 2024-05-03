export abstract class IDbFindOrderByIdRepository {
  abstract findById(id: string): Promise<any>;
}
