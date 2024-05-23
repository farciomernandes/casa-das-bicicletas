import { Injectable } from '@nestjs/common';
import { IDbListShippingRepository } from '../db/shipping/list-shipping-respository';
import { IDbUpdateShippingRepository } from '../db/shipping/update-shipping-repository';
import { IDbFindShippingByIdRepository } from '../db/shipping/find-shipping-by-id-repository';
import { IDbDeleteShippingRepository } from '../db/shipping/delete-shipping-repository';
import { AddShippingDto } from '@/presentation/dtos/shipping/add-shipping.dto';
import { UpdateShippingDto } from '@/presentation/dtos/shipping/update-shipping.dto';
import { ShippingModelDto } from '@/presentation/dtos/shipping/shipping-model.dto';

@Injectable()
export abstract class ShippingRepository
  implements
    IDbListShippingRepository,
    IDbUpdateShippingRepository,
    IDbFindShippingByIdRepository,
    IDbDeleteShippingRepository
{
  abstract findById(id: string): Promise<ShippingModelDto>;
  abstract getAll(): Promise<ShippingModelDto[]>;
  abstract create(payload: AddShippingDto): Promise<ShippingModelDto>;
  abstract delete(id: string): Promise<void>;
  abstract update(
    payload: UpdateShippingDto,
    id: string,
  ): Promise<ShippingModelDto>;
}
