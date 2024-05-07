import { Injectable } from '@nestjs/common';
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
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly stateRepository: StateRepository,
  ) {}

  async seedCities() {
    const resultCites = [];

    try {
      // Get all states
      const { data: states } = await axios.get<StateModelIbge[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      );
      // Iterate over each state
      for (const state of states) {
        // Get cities for each state
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
          const data = await this.cityRepository.create(newCity);
          resultCites.push(data);
        }
      }
    } catch (error) {
      console.error('Error seeding cities:', error);
    }
    return resultCites;
  }
}
