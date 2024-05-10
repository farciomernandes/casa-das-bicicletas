import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateProductRepository } from '@/core/domain/protocols/db/product/update-product-repository';
import { Product } from '@/core/domain/models/product.entity';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { AddProductModelDto } from '@/presentation/dtos/product/add-product.dto';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';

@Injectable()
export class DbUpdateProduct implements IDbUpdateProductRepository {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async update(payload: AddProductModelDto, id: string): Promise<Product> {
    try {
      const category = await this.categoryRepository.findById(
        payload.category_id,
      );

      if (!category) {
        throw new BadRequestException(
          `Category with id ${payload.category_id} not found!`,
        );
      }

      return await this.productRepository.update(payload, id);
    } catch (error) {
      if (error.message === 'Product not found') {
        throw new BadRequestException(`Product not found`);
      } else {
        throw error;
      }
    }
  }
}
