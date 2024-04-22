import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbAddProductRepository } from '@/core/domain/protocols/db/product/add-product-repository';
import { Product } from '@/core/domain/models/product.entity';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { AddProductModelDto } from '@/presentation/dtos/product/add-product.dto';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';

@Injectable()
export class DbAddProduct implements IDbAddProductRepository {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(payload: AddProductModelDto): Promise<Product> {
    const alreadyExists = await this.productRepository.findByName(payload.name);

    if (alreadyExists) {
      throw new BadRequestException(
        `Already exists a Product with ${payload.name} name.`,
      );
    }
    const categoryExists = await this.categoryRepository.findById(
      payload.category_id,
    );

    if (!categoryExists) {
      throw new BadRequestException(
        `Category with ${payload.category_id} id not found.`,
      );
    }

    return await this.productRepository.create(payload);
  }
}
