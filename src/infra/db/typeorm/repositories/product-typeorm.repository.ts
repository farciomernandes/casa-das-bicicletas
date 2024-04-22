import { Repository } from 'typeorm';
import { Product } from '@/core/domain/models/product.entity';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { AddProductModelDto } from '@/presentation/dtos/product/add-product.dto';
import { UpdateProductModelDto } from '@/presentation/dtos/product/update-product.dto';

export class ProductTypeOrmRepository implements ProductRepository {
  constructor(private readonly productRepository: Repository<Product>) {}
  async update(payload: UpdateProductModelDto, id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOneOrFail({
        where: { id },
      });

      this.productRepository.merge(product, payload);
      return this.productRepository.save(product);
    } catch (error) {
      throw new Error('Error update product');
    }
  }

  async findById(id: string): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async getAll(): Promise<any[]> {
    return this.productRepository.find({
      relations: ['category', 'attributes'],
    });
  }

  async create(payload: AddProductModelDto): Promise<Product> {
    const product = this.productRepository.create(payload);
    return this.productRepository.save(product);
  }
}
