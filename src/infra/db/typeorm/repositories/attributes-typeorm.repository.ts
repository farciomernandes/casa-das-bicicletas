import { Repository } from 'typeorm';
import { Attributes } from '@/core/domain/models/attributes.entity';
import { AttributesRepository } from '@/core/domain/protocols/repositories/attributes';
import { AddAttributesModel } from '@/presentation/dtos/attributes/add-attributes.dto';

export class AttributesTypeOrmRepository implements AttributesRepository {
  constructor(private readonly attributesRepository: Repository<Attributes>) {}

  async update(
    payload: Omit<AddAttributesModel, 'product_id'>,
    id: string,
  ): Promise<Attributes> {
    try {
      const attributes = await this.attributesRepository.findOneOrFail({
        where: { id },
      });

      this.attributesRepository.merge(attributes, payload);

      const save = await this.attributesRepository.save(attributes);
      console.log('save ', save);

      return save;
    } catch (error) {
      console.log(error);
      throw new Error('Attributes not found');
    }
  }

  async findById(id: string): Promise<Attributes> {
    return this.attributesRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.attributesRepository.delete(id);
  }

  async getAll(): Promise<Attributes[]> {
    return this.attributesRepository.find();
  }

  async create(
    payload: Omit<AddAttributesModel, 'image_link'>,
  ): Promise<Attributes> {
    const Attributes = this.attributesRepository.create(payload);
    return this.attributesRepository.save(Attributes);
  }
}
