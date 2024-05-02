import { ProductVariables } from '@/core/domain/models/product_variables.entity';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';
import { AddProductVariablesModel } from '@/presentation/dtos/product_variable/add-product_variables.dto';
import { UpdateProductVariablesModel } from '@/presentation/dtos/product_variable/update-product_variables.dto';
import { Repository } from 'typeorm';

export class ProductVariablesTypeOrmRepository
  implements ProductVariablesRepository
{
  constructor(
    private readonly ProductVariablesRepository: Repository<ProductVariables>,
  ) {}

  async update(
    payload: UpdateProductVariablesModel,
    id: string,
  ): Promise<ProductVariables> {
    try {
      const ProductVariables =
        await this.ProductVariablesRepository.findOneOrFail({
          where: { id },
        });

      this.ProductVariablesRepository.merge(ProductVariables, payload);

      const save = await this.ProductVariablesRepository.save(ProductVariables);
      return save;
    } catch (error) {
      throw new Error('ProductVariables not found');
    }
  }

  async findById(id: string): Promise<any> {
    const queryBuilder =
      this.ProductVariablesRepository.createQueryBuilder('product_variables');
    queryBuilder.where('product_variables.id = :id', { id });

    queryBuilder.leftJoinAndSelect('product_variables.product', 'product');

    return await queryBuilder.getOne();
  }
  async delete(id: string): Promise<void> {
    await this.ProductVariablesRepository.delete(id);
  }

  async getAll(): Promise<ProductVariables[]> {
    return this.ProductVariablesRepository.find();
  }

  async create(
    payload: Omit<AddProductVariablesModel, 'image_link'>,
  ): Promise<ProductVariables> {
    const ProductVariables = this.ProductVariablesRepository.create(payload);
    return this.ProductVariablesRepository.save(ProductVariables);
  }
}
