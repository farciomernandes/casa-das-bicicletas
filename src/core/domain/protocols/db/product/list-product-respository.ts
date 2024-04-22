import { ProductModelDto } from '@/presentation/dtos/product/product-model.dto';

export abstract class IDbListProductRepository {
  abstract getAll(): Promise<ProductModelDto[]>;
}
