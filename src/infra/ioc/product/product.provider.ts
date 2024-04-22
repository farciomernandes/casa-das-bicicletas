import { Provider } from '@nestjs/common';
import { ProductTypeOrmRepository } from '../../db/typeorm/repositories/product-typeorm.repository';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IDbDeleteProductRepository } from '@/core/domain/protocols/db/product/delete-product-repository';
import { IDbAddProductRepository } from '@/core/domain/protocols/db/product/add-product-repository';
import { IDbListProductRepository } from '@/core/domain/protocols/db/product/list-product-respository';
import { IDbUpdateProductRepository } from '@/core/domain/protocols/db/product/update-product-repository';
import { Product } from '@/core/domain/models/product.entity';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { DbAddProduct } from '@/core/application/product/db-add-product';
import { DbDeleteProduct } from '@/core/application/product/db-delete-product';
import { DbListProduct } from '@/core/application/product/db-list-product';
import { DbUpdateProduct } from '@/core/application/product/db-update-product';
import { AttributesTypeOrmRepository } from '@/infra/db/typeorm/repositories/attributes-typeorm.repository';
import { Attributes } from '@/core/domain/models/attributes.entity';
import { AttributesRepository } from '@/core/domain/protocols/repositories/attributes';

export const productProvider: Provider[] = [
  DbAddProduct,
  DbListProduct,
  DbDeleteProduct,
  DbUpdateProduct,
  {
    provide: ProductTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new ProductTypeOrmRepository(dataSource.getRepository(Product));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: ProductRepository,
    useClass: ProductTypeOrmRepository,
  },
  {
    provide: AttributesTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new AttributesTypeOrmRepository(
        dataSource.getRepository(Attributes),
      );
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: AttributesRepository,
    useClass: AttributesTypeOrmRepository,
  },
  {
    provide: IDbAddProductRepository,
    useFactory: (productRepository: ProductRepository): DbAddProduct => {
      return new DbAddProduct(productRepository);
    },
    inject: [ProductTypeOrmRepository, AttributesTypeOrmRepository],
  },
  {
    provide: IDbListProductRepository,
    useFactory: (productRepository: ProductRepository): DbListProduct => {
      return new DbListProduct(productRepository);
    },
    inject: [ProductTypeOrmRepository],
  },
  {
    provide: IDbUpdateProductRepository,
    useFactory: (productRepository: ProductRepository): DbUpdateProduct => {
      return new DbUpdateProduct(productRepository);
    },
    inject: [ProductTypeOrmRepository],
  },
  {
    provide: IDbDeleteProductRepository,
    useFactory: (productRepository: ProductRepository): DbDeleteProduct => {
      return new DbDeleteProduct(productRepository);
    },
    inject: [ProductTypeOrmRepository],
  },
];
