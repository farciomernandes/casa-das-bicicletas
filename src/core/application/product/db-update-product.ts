import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateProductRepository } from '@/core/domain/protocols/db/product/update-product-repository';
import { Product } from '@/core/domain/models/product.entity';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { AddProductModelDto } from '@/presentation/dtos/product/add-product.dto';

@Injectable()
export class DbUpdateProduct implements IDbUpdateProductRepository {
  constructor(private readonly productRepository: ProductRepository) {}

  async update(payload: AddProductModelDto, id: string): Promise<Product> {
    try {
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
