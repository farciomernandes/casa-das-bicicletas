import { EntitySchemaColumnOptions } from 'typeorm';

export const baseSchema = {
  id: {
    primary: true,
    type: 'uuid',
    generated: true,
  } as EntitySchemaColumnOptions,
  createdAt: {
    type: 'timestamp',
    default: new Date(),
  } as EntitySchemaColumnOptions,
  updatedAt: {
    type: 'timestamp',
    default: new Date(),
  } as EntitySchemaColumnOptions,
  deletedAt: {
    type: 'timestamp',
    nullable: true,
  } as EntitySchemaColumnOptions,
};
