import { ShippingOption } from 'aws-sdk/clients/snowball';

export abstract class IShippingCalculateSent {
  abstract calculateShipping(
    originZipCode: string,
    destinationZipCode: string,
    weight: number,
    length: number,
    height: number,
    width: number,
  ): Promise<ShippingOption[]>;
}
