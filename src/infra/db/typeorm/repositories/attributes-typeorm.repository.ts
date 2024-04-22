import { Repository } from 'typeorm';
import { Attributes } from '@/core/domain/models/attributes.entity';
import { AttributesRepository } from '@/core/domain/protocols/repositories/attributes';

export class AttributesTypeOrmRepository implements AttributesRepository {
  constructor(private readonly attributesRepository: Repository<Attributes>) {}

  async update(
    payload: Omit<Attributes, 'id'>,
    id: string,
  ): Promise<Attributes> {
    try {
      const Attributes = await this.attributesRepository.findOneOrFail({
        where: { id },
      });

      this.attributesRepository.merge(Attributes, payload);
      return this.attributesRepository.save(Attributes);
    } catch (error) {
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

  async create(payload: Omit<Attributes, 'id'>): Promise<Attributes> {
    const Attributes = this.attributesRepository.create(payload);
    return this.attributesRepository.save(Attributes);
  }
}
