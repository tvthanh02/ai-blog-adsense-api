import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
@Injectable()
export class UploadService {
  private readonly useCloudStorage: boolean;

  constructor(private configService: ConfigService) {
    this.useCloudStorage = this.configService.get('USE_CLOUD_STORAGE') === 'true';
    if (this.useCloudStorage) {
      cloudinary.config({
        cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
        api_key: this.configService.get('CLOUDINARY_API_KEY'),
        api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
      });
    }
  }

  getFileUrl(filename: string): string {
    if (this.useCloudStorage) {
      return cloudinary.url(filename);
    }
    return `/uploads/${filename}`;
  }
}
