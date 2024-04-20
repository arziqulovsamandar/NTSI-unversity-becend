import { Module } from '@nestjs/common';
import { ImgService } from './news.service';
import { ImgController } from './news.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Img } from './models/news.model';
import { JwtModule } from '@nestjs/jwt';
import { NewsUz } from 'src/newsUz/models/news.model';
import { NewsRu } from 'src/newsRu/models/news.model';
import { NewsEn } from 'src/newsEn/models/news.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Img,NewsEn,NewsRu,NewsUz]),
    JwtModule.register({})
  ],
  controllers: [ImgController],
  providers: [ImgService],
  exports: [ImgService],
})
export class ImgModule {}
