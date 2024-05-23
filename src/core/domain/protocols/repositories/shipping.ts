import { Injectable } from '@nestjs/common';
import { IDbListShippingRepository } from '../db/shipping/list-shipping-respository';
import { IDbUpdateShippingRepository } from '../db/shipping/update-shipping-repository';
import { IDbFindShippingByIdRepository } from '../db/shipping/find-shipping-by-id-repository';
import { IDbDeleteShippingRepository } from '../db/shipping/delete-shipping-repository';
import { Shipping } from '../../models/shipping.entity';
import { AddShippingDto } from '@/presentation/dtos/shipping/add-shipping.dto';
import { UpdateShippingDto } from '@/presentation/dtos/shipping/update-shipping.dto';

@Injectable()
export abstract class ShippingRepository
  implements
    IDbListShippingRepository,
    IDbUpdateShippingRepository,
    IDbFindShippingByIdRepository,
    IDbDeleteShippingRepository
{
  abstract findById(id: string): Promise<Shipping>;
  abstract getAll(): Promise<Shipping[]>;
  abstract create(payload: AddShippingDto): Promise<Shipping>;
  abstract delete(id: string): Promise<void>;
  abstract update(payload: UpdateShippingDto, id: string): Promise<Shipping>;
}
