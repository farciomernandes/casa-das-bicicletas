import { ProductVariables } from '@/core/domain/models/product_variables.entity';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';
import { AddProductVariablesModel } from '@/presentation/dtos/product_variable/add-product_variables.dto';
import { UpdateProductVariablesModel } from '@/presentation/dtos/product_variable/update-product_variables.dto';
import { Repository } from 'typeorm';

export class ProductVariablesTypeOrmRepository
  implements ProductVariablesRepository
{
  constructor(
    private readonly productVariablesRepository: Repository<ProductVariables>,
  ) {}

  async update(
    payload: UpdateProductVariablesModel,
    id: string,
    image_link?: string,
  ): Promise<ProductVariables> {
    try {
      const productVariables =
        await this.productVariablesRepository.findOneOrFail({
          where: { id },
        });

      const updateProductvariable = {
        ...payload,
        image_link,
      };

      this.productVariablesRepository.merge(
        productVariables,
        updateProductvariable,
      );

      const save = await this.productVariablesRepository.save(productVariables);
      return save;
    } catch (error) {
      throw new Error('ProductVariables error');
    }
  }

  async findById(id: string): Promise<any> {
    const queryBuilder =
      this.productVariablesRepository.createQueryBuilder('product_variables');
    queryBuilder.where('product_variables.id = :id', { id });

    queryBuilder.leftJoinAndSelect('product_variables.product', 'product');

    return await queryBuilder.getOne();
  }
  async delete(id: string): Promise<void> {
    await this.productVariablesRepository.delete(id);
  }

  async getAll(): Promise<ProductVariables[]> {
    return this.productVariablesRepository.find();
  }

  async create(
    payload: Omit<AddProductVariablesModel, 'image_link'>,
  ): Promise<ProductVariables> {
    const ProductVariables = this.productVariablesRepository.create(payload);
    return this.productVariablesRepository.save(ProductVariables);
  }
}
