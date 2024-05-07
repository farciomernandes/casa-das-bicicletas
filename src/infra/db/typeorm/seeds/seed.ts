import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { IRoleSeed } from '@/core/domain/protocols/db/role/seed-role';
import { IStateSeed } from '@/core/domain/protocols/db/state/seed-state';
import { ICitySeed } from '@/core/domain/protocols/db/city/seed-city';

async function seed() {
  const app = await NestFactory.create(AppModule);

  try {
    console.log('Start seeds');
    const stateSeedSeedService = app.get(IStateSeed);
    const citySeedSeedService = app.get(ICitySeed);
    const roleSeedSeedService = app.get(IRoleSeed);
    await stateSeedSeedService.seedStates();
    console.log('States is ready');
    await citySeedSeedService.seedCities();
    console.log('Cities is ready');
    await roleSeedSeedService.seedRoles();
    console.log('Roles is ready');
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await app.close();
  }
}

seed();
