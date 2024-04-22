import { IDbListProductRepository } from '@/core/domain/protocols/db/product/list-product-respository';
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { ProductModelDto } from '@/presentation/dtos/product/product-model.dto';

@Injectable()
export class DbListProduct implements IDbListProductRepository {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAll(): Promise<ProductModelDto[]> {
    return await this.productRepository.getAll();
  }
}
