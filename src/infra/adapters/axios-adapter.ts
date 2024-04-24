import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AxiosAdapter {
  private api: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.api = axios.create({
      baseURL: configService.get<string>('ASAAS_API_URL'),
      headers: {
        access_token:
          '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNzkyNDM6OiRhYWNoXzQxYTg2ODJlLTRhNjEtNDYzOS05MzFlLWZhMzE3MDljYmI2NQ==',
      },
    });
  }

  async get(url: string): Promise<any> {
    try {
      const response = await this.api.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer a solicitação POST:', error.response.data);
      throw error;
    }
  }

  async post(url: string, data: any): Promise<any> {
    try {
      const response = await this.api.post(url, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer a solicitação POST:', error.response.data);
      throw error;
    }
  }
}
