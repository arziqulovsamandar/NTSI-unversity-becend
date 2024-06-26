import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Img } from './models/news.model';
import { Op } from 'sequelize';
import { UpdateNewsImgDto} from './dto/update-img.dto';
import { CreateNewsimgDto } from './dto/create-img.dto';

@Injectable()
export class ImgService {
  constructor(
    @InjectModel(Img) private newsRepository: typeof Img
  ) {}

  async create(createNewsDto: CreateNewsimgDto) {
    const news = await this.newsRepository.create(createNewsDto);
    return news;
  }

  async findAll(): Promise<Img[]> {
    return this.newsRepository.findAll({ include: { all: true } });
  }

  async findById(id: number): Promise<Img> {
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
  ): Promise<Img> {
    const category = await this.newsRepository.update(updatenewsDto, {
      where: { id },
      returning: true,
    });
    return category[1][0];
  }

  async search(url: string) {
    const where = {};

    if (url) {
      where['name'] = {
        [Op.like]: `%${url}%`,
      };
    }
    const news = await Img.findAll({ where });
    if (!news) {
      throw new BadRequestException('news not found');
    }
    return news;
  }
}
