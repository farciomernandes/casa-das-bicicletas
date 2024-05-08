import { Repository } from 'typeorm';
import { Product } from '@/core/domain/models/product.entity';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { AddProductModelDto } from '@/presentation/dtos/product/add-product.dto';
import { UpdateProductModelDto } from '@/presentation/dtos/product/update-product.dto';
import { ProductParamsDTO } from '@/presentation/dtos/product/params-product.dto';
import { ProductModelDto } from '@/presentation/dtos/product/product-model.dto';

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

  async getAll(params: ProductParamsDTO): Promise<ProductModelDto[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (params.id) {
      queryBuilder.andWhere('product.id = :id', { id: params.id });
    }

    if (params.category_id) {
      queryBuilder.andWhere('product.category_id = :categoryId', {
        categoryId: params.category_id,
      });
    }

    if (params.name) {
      queryBuilder.andWhere('product.name LIKE :name', {
        name: `%${params.name}%`,
      });
    }

    if (params.price) {
      queryBuilder.innerJoin('product.product_variables', 'product_variables');
      queryBuilder.andWhere('product_variables.price = :price', {
        price: params.price,
      });
    }

    if (params.sku) {
      queryBuilder.innerJoin('product.product_variables', 'product_variables');
      queryBuilder.andWhere('product_variables.sku = :sku', {
        sku: params.sku,
      });
    }

    if (params.limit) {
      queryBuilder.take(params.limit);
    }

    if (params.page) {
      queryBuilder.skip((Number(params.page) - 1) * params.limit);
    }

    queryBuilder.leftJoinAndSelect('product.category', 'category');
    queryBuilder.leftJoinAndSelect(
      'product.product_variables',
      'product_variables',
    );

    const products = await queryBuilder.getMany();
    return products.map((product) => ProductModelDto.toDto(product));
  }

  async create(payload: AddProductModelDto): Promise<Product> {
    const product = this.productRepository.create(payload);
    const newProduct = await this.productRepository.save(product);
    return newProduct;
  }
}
