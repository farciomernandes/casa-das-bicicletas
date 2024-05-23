import { ApiProperty } from '@nestjs/swagger';

export class DeliveryRangeDto {
  @ApiProperty({ example: 9, description: 'Minimum delivery time in days' })
  min: number;

  @ApiProperty({ example: 10, description: 'Maximum delivery time in days' })
  max: number;
}

export class DimensionsDto {
  @ApiProperty({
    example: 2,
    description: 'Height of the package in centimeters',
  })
  height: number;

  @ApiProperty({
    example: 8,
    description: 'Width of the package in centimeters',
  })
  width: number;

  @ApiProperty({
    example: 13,
    description: 'Length of the package in centimeters',
  })
  length: number;
}

export class ProductDto {
  @ApiProperty({ example: '1', description: 'Product ID' })
  id: string;

  @ApiProperty({ example: 1, description: 'Quantity of the product' })
  quantity: number;
}

export class PackageDto {
  @ApiProperty({ example: '21.21', description: 'Price of the package' })
  price: string;

  @ApiProperty({ example: '3.09', description: 'Discount on the package' })
  discount: string;

  @ApiProperty({ example: 'box', description: 'Format of the package' })
  format: string;

  @ApiProperty({
    example: '1.00',
    description: 'Weight of the package in kilograms',
  })
  weight: string;

  @ApiProperty({
    example: '0.00',
    description: 'Insurance value of the package',
  })
  insurance_value: string;

  @ApiProperty({
    type: [ProductDto],
    description: 'List of products in the package',
  })
  products: ProductDto[];

  @ApiProperty({
    type: DimensionsDto,
    description: 'Dimensions of the package',
  })
  dimensions: DimensionsDto;
}

export class AdditionalServicesDto {
  @ApiProperty({
    example: false,
    description: 'Whether receipt service is included',
  })
  receipt: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether own hand service is included',
  })
  own_hand: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether collect service is included',
  })
  collect: boolean;
}

export class CompanyDto {
  @ApiProperty({ example: 1, description: 'Company ID' })
  id: number;

  @ApiProperty({ example: 'Correios', description: 'Name of the company' })
  name: string;

  @ApiProperty({
    example:
      'https://www.melhorenvio.com.br/images/shipping-companies/correios.png',
    description: 'Picture URL of the company',
  })
  picture: string;
}

export class ShippingOptionDto {
  @ApiProperty({ example: 1, description: 'Shipping option ID' })
  id: number;

  @ApiProperty({ example: 'PAC', description: 'Name of the shipping option' })
  name: string;

  @ApiProperty({
    example: '21.21',
    description: 'Price of the shipping option',
  })
  price: string;

  @ApiProperty({
    example: '21.21',
    description: 'Custom price of the shipping option',
  })
  custom_price: string;

  @ApiProperty({
    example: '3.09',
    description: 'Discount on the shipping option',
  })
  discount: string;

  @ApiProperty({ example: 'R$', description: 'Currency of the shipping price' })
  currency: string;

  @ApiProperty({ example: 10, description: 'Estimated delivery time in days' })
  delivery_time: number;

  @ApiProperty({
    type: DeliveryRangeDto,
    description: 'Delivery range in days',
  })
  delivery_range: DeliveryRangeDto;

  @ApiProperty({
    example: 10,
    description: 'Custom estimated delivery time in days',
  })
  custom_delivery_time: number;

  @ApiProperty({
    type: DeliveryRangeDto,
    description: 'Custom delivery range in days',
  })
  custom_delivery_range: DeliveryRangeDto;

  @ApiProperty({ type: [PackageDto], description: 'List of packages' })
  packages: PackageDto[];

  @ApiProperty({
    type: AdditionalServicesDto,
    description: 'Additional services included',
  })
  additional_services: AdditionalServicesDto;

  @ApiProperty({
    type: CompanyDto,
    description: 'Company providing the shipping option',
  })
  company: CompanyDto;

  @ApiProperty({
    example: 'Transportadora não atende este trecho.',
    description: 'Error message, if any',
    required: false,
  })
  error?: string;

  static toDto(payload: any): ShippingOptionDto {
    const shippingOptionDto = new ShippingOptionDto();
    shippingOptionDto.id = payload.id;
    shippingOptionDto.name = payload.name;
    shippingOptionDto.price = payload.price;
    shippingOptionDto.custom_price = payload.custom_price;
    shippingOptionDto.discount = payload.discount;
    shippingOptionDto.currency = payload.currency;
    shippingOptionDto.delivery_time = payload.delivery_time;
    shippingOptionDto.delivery_range = payload.delivery_range;
    shippingOptionDto.custom_delivery_time = payload.custom_delivery_time;
    shippingOptionDto.custom_delivery_range = payload.custom_delivery_range;
    shippingOptionDto.packages = payload.packages;
    shippingOptionDto.additional_services = payload.additional_services;
    shippingOptionDto.company = payload.company;
    shippingOptionDto.error = payload.error;
    return shippingOptionDto;
  }
}
