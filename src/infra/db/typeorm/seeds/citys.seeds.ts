import { Injectable, Logger } from '@nestjs/common';
import { CityRepository } from '@/core/domain/protocols/repositories/city';
import axios from 'axios';
import { StateRepository } from '@/core/domain/protocols/repositories/state';

interface StateModelIbge {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: string;
    sigla: string;
    nome: string;
  };
}
@Injectable()
export class CitySeed {
  private readonly logger = new Logger(CitySeed.name);

  constructor(
    private readonly cityRepository: CityRepository,
    private readonly stateRepository: StateRepository,
  ) {}

  async seedCities() {
    const resultCites = [];

    try {
      const { data: states } = await axios.get<StateModelIbge[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      );
      for (const state of states) {
        const { data: cities } = await axios.get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.id}/municipios`,
        );
        const stateOnDatabase = await this.stateRepository.findByName(
          state.nome,
        );

        for (const city of cities) {
          const newCity: any = {
            name: city.nome,
            state_id: stateOnDatabase.id,
          };
          const alreadyExists = await this.cityRepository.findByName(
            newCity.name,
          );
          if (!alreadyExists) {
            const data = await this.cityRepository.create(newCity);
            resultCites.push(data);
          }
        }
      }
    } catch (error) {
      console.log(error);
      this.logger.error(`Error seeding cities: ${error.message}`);
    }
    return resultCites;
  }
}
