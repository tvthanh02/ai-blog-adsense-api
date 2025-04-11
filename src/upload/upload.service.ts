import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  constructor() {}

  getFileUrl(filename: string): string {
    return `/uploads/${filename}`;
  }
}
