import { ProductVariables } from '@/core/domain/models/product_variables.entity';
import { IDbUpdateProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/update-product_variable-repository';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';
import { AddProductVariablesModel } from '@/presentation/dtos/product_variable/add-product_variables.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class DbUpdateProductVariables
  implements IDbUpdateProductVariablesRepository
{
  constructor(
    private readonly productVariablesRepository: ProductVariablesRepository,
  ) {}

  async update(
    payload: Omit<AddProductVariablesModel, 'product_id'>,
    id: string,
  ): Promise<ProductVariables> {
    try {
      return await this.productVariablesRepository.update(payload, id);
    } catch (error) {
      if (error.message === 'ProductVariables not found') {
        throw new BadRequestException(`ProductVariables not found`);
      } else {
        throw error;
      }
    }
  }
}
