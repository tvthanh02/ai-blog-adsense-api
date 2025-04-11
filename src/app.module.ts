import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const baseConfig: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: +configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };

        const sslSecure = configService.get('SSL_SECURE') === 'true';
        return sslSecure
          ? {
              ...baseConfig,
              ssl: {
                require: true,
                rejectUnauthorized: false,
              },
            }
          : baseConfig;
      },
      inject: [ConfigService],
    }),
    AuthorModule,
    CategoryModule,
    PostModule,
    CommentModule,
    UploadModule,
  ],
})
export class AppModule {}
