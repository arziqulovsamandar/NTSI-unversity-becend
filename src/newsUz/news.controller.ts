import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewsService } from './news.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewsUz } from './models/news.model';
import { AdminGuard } from '../guards/admin.guard';
import { UpdateNewsImgDto} from './dto/update-img.dto';
import { CreateNewsimgDto } from './dto/create-img.dto';

@ApiTags('NewsUz')
@Controller('news/uz')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: 'Add News' })
  @ApiResponse({ status: 200, description: 'New  News', type: [NewsUz] })
  @UseGuards(AdminGuard)
  @Post('create')
  create(
    @Body() createNewsDto: CreateNewsimgDto
  ): Promise<NewsUz> {
    return this.newsService.create(createNewsDto);
  }

  @ApiOperation({ summary: 'View all news' })
  @ApiResponse({
    status: 200,
    description: 'List of news',
    type: [NewsUz],
  })
  @Get('all')
  async findAll(): Promise<NewsUz[]> {
    return this.newsService.findAll();
  }

  @ApiOperation({ summary: 'News  edit' })
  @ApiResponse({ status: 200, description: 'News by Id', type: [NewsUz] })
  @UseGuards(AdminGuard)
  @Put(':id')
  async updateByIdUz(
    @Param('id') id: string,
    @Body() updatenewsuzDto: UpdateNewsImgDto,
  ) {
    return this.newsService.updateByIdUz(+id, updatenewsuzDto);
  }



  @ApiOperation({ summary: 'View news by id' })
  @ApiResponse({ status: 200, description: 'News', type: NewsUz })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<NewsUz> {
    return this.newsService.findById(+id);
  }

  @ApiOperation({ summary: 'Delete news' })
  @ApiResponse({
    status: 200,
    description: 'Deleted news',
    type: [NewsUz],
  })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<number> {
    return this.newsService.deleteById(+id);
  }

  @ApiOperation({ summary: 'Search news' })
  @Post('search')
  search(@Query('text') text: string) {
    return this.newsService.search(text);
  }
}
