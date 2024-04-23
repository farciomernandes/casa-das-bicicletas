import { Repository } from 'typeorm';
import { Product } from '@/core/domain/models/product.entity';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { AddProductModelDto } from '@/presentation/dtos/product/add-product.dto';
import { UpdateProductModelDto } from '@/presentation/dtos/product/update-product.dto';

export class ProductTypeOrmRepository implements ProductRepository {
  constructor(private readonly productRepository: Repository<Product>) {}

  async findByName(name: string): Promise<Product> {
    return this.productRepository.findOne({ where: { name } });
  }

  async update(payload: UpdateProductModelDto, id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOneOrFail({
        where: { id },
      });

      this.productRepository.merge(product, payload);
      return this.productRepository.save(product);
    } catch (error) {
      throw new Error('Error updating product');
    }
  }

  async findById(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      return product;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async getAll(): Promise<any[]> {
    const products = await this.productRepository.find({
      relations: ['category', 'attributes'],
    });
    return products;
  }

  async create(payload: AddProductModelDto): Promise<Product> {
    const product = this.productRepository.create(payload);
    const newProduct = await this.productRepository.save(product);
    return newProduct;
  }
}
