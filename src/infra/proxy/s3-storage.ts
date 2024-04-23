import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { promises as fsPromises } from 'fs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3UploadImage } from '@/core/domain/protocols/aws/s3-upload-image';
import { S3DeleteImage } from '@/core/domain/protocols/aws/s3-delete-image';

@Injectable()
export class S3Storage implements S3UploadImage, S3DeleteImage {
  private client: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    this.client = new AWS.S3({
      region: configService.get<string>('AWS_REGION'),
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>('AWS_SECRET_KEY'),
    });
  }

  async saveFile(file: Express.Multer.File, bucket?: string): Promise<string> {
    try {
      const { filename, mimetype, path } = file;

      if (!bucket) {
        bucket = this.configService.get<string>('AWS_BUCKET');
      }

      const fileContent = await fsPromises.readFile(path);

      await this.client
        .putObject({
          Bucket: bucket,
          Key: filename,
          ACL: 'public-read',
          Body: fileContent,
          ContentType: mimetype,
        })
        .promise();

      await fsPromises.unlink(path);

      const objectUrl = `https://${bucket}.s3.${this.client.config.region}.amazonaws.com/${filename}`;

      return objectUrl;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao salvar o arquivo no S3');
    }
  }

  async deleteBucket(object_key: string): Promise<void> {
    const name = object_key.match(/([^\/]+)$/)[0];

    try {
      await this.client
        .deleteObject({
          Bucket: this.configService.get<string>('AWS_BUCKET'),
          Key: name,
        })
        .promise();
    } catch (error) {
      console.error('Erro ao excluir o bucket:', error);
      throw new InternalServerErrorException('Erro ao excluir o bucket do S3');
    }
  }
}
