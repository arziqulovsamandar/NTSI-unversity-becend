import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NewsRu } from './models/news.model';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    SequelizeModule.forFeature([NewsRu]),
    JwtModule.register({}),
    FilesModule
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsRuModule {}
