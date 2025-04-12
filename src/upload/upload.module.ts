import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const useCloudStorage = configService.get('USE_CLOUD_STORAGE') === 'true';

        if (useCloudStorage) {
          // Configure Cloudinary
          cloudinary.config({
            cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: configService.get('CLOUDINARY_API_KEY'),
            api_secret: configService.get('CLOUDINARY_API_SECRET'),
          });

          return {
            storage: new CloudinaryStorage({
              cloudinary: cloudinary,
              params: {
                folder: 'uploads',
                format: async (req, file) => {
                  const extension = path.extname(file.originalname).substring(1).toLowerCase();
                  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'svg'].includes(extension)
                    ? extension
                    : 'raw';
                },
                public_id: (req, file) => {
                  const filename = path.parse(file.originalname);
                  return filename.name;
                },
              } as any,
            }),
          };
        } else {
          return {
            storage: diskStorage({
              destination: uploadsDir,
              filename: (req, file, callback) => {
                callback(null, `${file.originalname}`);
              },
            }),
          };
        }
      },
    }),
    ConfigModule,
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
