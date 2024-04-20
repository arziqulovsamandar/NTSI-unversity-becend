import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Img } from './models/news.model';
import { FilesService } from '../files/files.service';
import { Op } from 'sequelize';
import { UpdateNewsImgDto} from './dto/update-img.dto';
import { CreateNewsimgDto } from './dto/create-img.dto';

@Injectable()
export class ImgService {
  constructor(
    @InjectModel(Img) private newsRepository: typeof Img,
    private readonly fileService: FilesService,
  ) {}

  async create(createNewsDto: CreateNewsimgDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const news = await this.newsRepository.create({
      description: createNewsDto.description,
      image: fileName,
    });
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


  async removeFile(id: number) {
    const news = await this.newsRepository.findOne({ where: { id } });

    if (!news) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.fileService.removeFile(news.image);
  }

  async updateImage(id: number, image: any) {
    const removeFile = await this.removeFile(id);

    if (!removeFile) {
      throw new BadRequestException("Don't remove image");
    }

    const createFile = await this.fileService.createFile(image);
    const updateFile = await this.newsRepository.update(
      {
        image: createFile,
      },
      { where: { id }, returning: true },
    );
    return updateFile;
  }

  async remove(id: number) {
    const post = await this.newsRepository.findOne({ where: { id } });

    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.fileService.removeFile(post.image);
  }

  async search(name: string) {
    const where = {};

    if (name) {
      where['name'] = {
        [Op.like]: `%${name}%`,
      };
    }
    const news = await Img.findAll({ where });
    if (!news) {
      throw new BadRequestException('news not found');
    }
    return news;
  }
}
