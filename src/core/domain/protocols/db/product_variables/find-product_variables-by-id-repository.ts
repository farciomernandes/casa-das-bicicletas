import { ProductVariables } from '@/core/domain/models/product_variables.entity';

export abstract class IDbFindProductVariableByIdRepository {
  abstract findById(id: string): Promise<ProductVariables>;
}
