import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NewsRu } from './models/news.model';
import { FilesService } from '../files/files.service';
import { Op } from 'sequelize';
import { UpdateNewsImgDto} from './dto/update-img.dto';
import { CreateNewsimgDto } from './dto/create-img.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(NewsRu) private newsRepository: typeof NewsRu,
    private readonly fileService: FilesService,
  ) {}

  async create(createNewsDto: CreateNewsimgDto) {
    const news = await this.newsRepository.create({
      text: createNewsDto.text
    });
    return news;
  }

  async findAll(): Promise<NewsRu[]> {
    return this.newsRepository.findAll({ include: { all: true } });
  }

  async findById(id: number): Promise<NewsRu> {
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
  ): Promise<NewsRu> {
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
    const news = await NewsRu.findAll({ where });
    if (!news) {
      throw new BadRequestException('news not found');
    }
    return news;
  }
}
