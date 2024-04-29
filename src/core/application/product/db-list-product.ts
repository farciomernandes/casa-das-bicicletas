import { IDbListProductRepository } from '@/core/domain/protocols/db/product/list-product-respository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { ProductModelDto } from '@/presentation/dtos/product/product-model.dto';
import { CategoryModelDto } from '@/presentation/dtos/category/category-model.dto';
import { ProductParamsDTO } from '@/presentation/dtos/product/params-product.dto';

@Injectable()
export class DbListProduct implements IDbListProductRepository {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAll(queryParams: ProductParamsDTO): Promise<ProductModelDto[]> {
    try {
      const products = await this.productRepository.getAll({
        ...queryParams,
        limit: queryParams.limit ? queryParams.limit : 8,
        page: queryParams.page ? queryParams.page : 1,
      });

      return products.map((product) => {
        return {
          ...ProductModelDto.toDto(product),
          category: CategoryModelDto.toDto(product.category),
        };
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
