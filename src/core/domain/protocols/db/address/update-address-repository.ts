import { Address } from '@/core/domain/models/address.entity';
import { UploadAddressDto } from '@/presentation/dtos/address/upload-address.dto';

export abstract class IDbUpdateAddressRepository {
  abstract update(payload: UploadAddressDto, id: string): Promise<Address>;
}
