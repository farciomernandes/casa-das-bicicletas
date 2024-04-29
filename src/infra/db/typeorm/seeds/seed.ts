import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { IRoleSeed } from '@/core/domain/protocols/db/role/seed-role';

async function seed() {
  const app = await NestFactory.create(AppModule);

  try {
    console.log('start seeds');
    const roleSeedSeedService = app.get(IRoleSeed);
    await roleSeedSeedService.seedRoles();
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await app.close();
  }
}

seed();
