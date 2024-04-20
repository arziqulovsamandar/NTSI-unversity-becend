import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NewsUz } from './models/news.model';
import { Op } from 'sequelize';
import { UpdateNewsImgDto } from './dto/update-img.dto';
import { CreateNewsimgDto } from './dto/create-img.dto';

@Injectable()
export class NewsService {
  constructor(@InjectModel(NewsUz) private newsRepository: typeof NewsUz) {}

  async create(createNewsDto: CreateNewsimgDto) {
    const news = await this.newsRepository.create(createNewsDto);
    return news;
  }

  async findAll(): Promise<NewsUz[]> {
    return this.newsRepository.findAll({ include: { all: true } });
  }

  async findById(id: number): Promise<NewsUz> {
    const news = await this.newsRepository.findByPk(id);
    return news;
  }

  async deleteById(id: number): Promise<number> {
    const news = await this.newsRepository.destroy({ where: { id } });
    return news;
  }

  async updateByIdUz(
    id: number,
    updatenewsDto: UpdateNewsImgDto,
  ): Promise<NewsUz> {
    const category = await this.newsRepository.update(updatenewsDto, {
      where: { id },
      returning: true,
    });
    return category[1][0];
  }

  async search(text: string) {
    const where = {};

    if (text) {
      where['text'] = {
        [Op.like]: `%${text}%`,
      };
    }
    const news = await NewsUz.findAll({ where });
    if (!news) {
      throw new BadRequestException('news not found');
    }
    return news;
  }
}
