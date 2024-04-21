import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AxiosAdapter {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.ASAAS_API_URL,
      headers: {
        access_token: process.env.ASAAS_API_ACCESS_TOKEN,
      },
    });
  }

  // Método para fazer uma solicitação GET
  async get(url: string): Promise<any> {
    try {
      const response = await this.api.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer a solicitação GET:', error);
      throw error;
    }
  }

  async post(url: string, data: any): Promise<any> {
    try {
      const response = await this.api.post(url, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer a solicitação POST:', error);
      throw error;
    }
  }

  // Adicione outros métodos conforme necessário, como PUT, DELETE, etc.
}
