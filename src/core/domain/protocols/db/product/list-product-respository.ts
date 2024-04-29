import { ProductParamsDTO } from '@/presentation/dtos/product/params-product.dto';
import { ProductModelDto } from '@/presentation/dtos/product/product-model.dto';

export abstract class IDbListProductRepository {
  abstract getAll(params: ProductParamsDTO): Promise<ProductModelDto[]>;
}
