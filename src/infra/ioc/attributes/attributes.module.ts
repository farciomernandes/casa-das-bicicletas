import { Module } from '@nestjs/common';
import { attributesProvider } from './attributes.provider';
import { IDbAddAttributesRepository } from '@/core/domain/protocols/db/attributes/add-attributes-repository';
import { IDbListAttributesRepository } from '@/core/domain/protocols/db/attributes/list-attributes-respository';
import { IDbDeleteAttributesRepository } from '@/core/domain/protocols/db/attributes/delete-attributes-repository';
import { IDbUpdateAttributesRepository } from '@/core/domain/protocols/db/attributes/update-attributes-repository';
import { AttributesRepository } from '@/core/domain/protocols/repositories/attributes';
import { AttributesController } from '@/presentation/controllers/attributes/attributes-controller';
import { S3UploadImage } from '@/core/domain/protocols/aws/s3-upload-image';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';

@Module({
  imports: [],
  providers: [...attributesProvider],
  controllers: [AttributesController],
  exports: [
    IDbAddAttributesRepository,
    IDbListAttributesRepository,
    IDbDeleteAttributesRepository,
    IDbUpdateAttributesRepository,
    AttributesRepository,
    ProductRepository,
    S3UploadImage,
  ],
})
export class AttributesModule {}
