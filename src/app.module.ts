import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';

import { resolve } from 'path';
import { Admin } from './admin/models/admin.model';
import { AdminModule } from './admin/admin.module';
import { NewsEn } from './newsEn/models/news.model';
import { NewsRu } from './newsRu/models/news.model';
import { NewsUz } from './newsUz/models/news.model';
import { NewsEnModule } from './newsEn/news.module';
import { NewsRuModule } from './newsRu/news.module';
import { NewsUzModule } from './newsUz/news.module';
import { Img } from './img/models/news.model';
import { ImgModule } from './img/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Admin, NewsEn, NewsRu, NewsUz,Img],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
    NewsEnModule,
    NewsRuModule,
    NewsUzModule,
    ImgModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
