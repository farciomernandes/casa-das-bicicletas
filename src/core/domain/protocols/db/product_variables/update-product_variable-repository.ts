import { ProductVariables } from '@/core/domain/models/product_variables.entity';
import { UpdateProductVariablesModel } from '@/presentation/dtos/product_variable/update-product_variables.dto';

export abstract class IDbUpdateProductVariablesRepository {
  abstract update(
    payload: UpdateProductVariablesModel,
    id: string,
  ): Promise<ProductVariables>;
}
