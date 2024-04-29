import { Module } from '@nestjs/common';
import { S3UploadImage } from '@/core/domain/protocols/aws/s3-upload-image';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { productVariablesProvider } from './product_variables.provider';
import { IDbAddProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/add-product_variables-repository';
import { IDbListProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/list-product_variables-respository';
import { IDbDeleteProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/delete-product_variables-repository';
import { IDbUpdateProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/update-product_variable-repository';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';
import { ProductVariablesController } from '@/presentation/controllers/product_variable/product_variables-controller';

@Module({
  imports: [],
  providers: [...productVariablesProvider],
  controllers: [ProductVariablesController],
  exports: [
    IDbAddProductVariablesRepository,
    IDbListProductVariablesRepository,
    IDbDeleteProductVariablesRepository,
    IDbUpdateProductVariablesRepository,
    ProductVariablesRepository,
    ProductRepository,
    S3UploadImage,
  ],
})
export class ProductVariablesModule {}
