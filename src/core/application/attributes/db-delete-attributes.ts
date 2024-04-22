import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbDeleteAttributesRepository } from '@/core/domain/protocols/db/attributes/delete-attributes-repository';
import { AttributesRepository } from '@/core/domain/protocols/repositories/attributes';

@Injectable()
export class DbDeleteAttributes implements IDbDeleteAttributesRepository {
  constructor(private readonly attributesRepository: AttributesRepository) {}

  async delete(id: string): Promise<void> {
    const alreadyExists = await this.attributesRepository.findById(id);

    if (!alreadyExists) {
      throw new BadRequestException(`Attributes not found`);
    }
    await this.attributesRepository.delete(id);
  }
}
