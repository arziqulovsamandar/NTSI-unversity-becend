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
import { ImgService } from './news.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Img } from './models/news.model';
import { AdminGuard } from '../guards/admin.guard';
import { UpdateNewsImgDto} from './dto/update-img.dto';
import { CreateNewsimgDto } from './dto/create-img.dto';

@ApiTags('Img')
@Controller('img')
export class ImgController {
  constructor(private readonly newsService: ImgService) {}

  @ApiOperation({ summary: 'Add Img' })
  @ApiResponse({ status: 200, description: 'New  News', type: [Img] })
  @UseGuards(AdminGuard)
  @Post('create/img')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createNewsDto: CreateNewsimgDto,
    @UploadedFile() image: any,
  ): Promise<Img> {
    return this.newsService.create(createNewsDto, image);
  }

  @ApiOperation({ summary: 'View all news' })
  @ApiResponse({
    status: 200,
    description: 'List of news',
    type: [Img],
  })
  @Get('all/img')
  async findAll(): Promise<Img[]> {
    return this.newsService.findAll();
  }

  @ApiOperation({ summary: 'News  edit' })
  @ApiResponse({ status: 200, description: 'News by Id', type: [Img] })
  @UseGuards(AdminGuard)
  @Put(':id')
  async updateByIdUz(
    @Param('id') id: string,
    @Body() updatenewsuzDto: UpdateNewsImgDto,
  ) {
    return this.newsService.updateByIdUz(+id, updatenewsuzDto);
  }


  @ApiOperation({ summary: 'Image by id update ' })
  @ApiResponse({ status: 201, description: 'update by id image', type: [Post] })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Put('file/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateFile(@Param('id') id: string, @UploadedFile() image: any) {
    return this.newsService.updateImage(+id, image);
  }

  @ApiOperation({ summary: 'View news by id' })
  @ApiResponse({ status: 200, description: 'News', type: Img })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Img> {
    return this.newsService.findById(+id);
  }

  @ApiOperation({ summary: 'Delete news' })
  @ApiResponse({
    status: 200,
    description: 'Deleted news',
    type: [Img],
  })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<number> {
    return this.newsService.deleteById(+id);
  }

  @ApiOperation({ summary: 'Search news' })
  @Post('search')
  search(@Query('name') name: string) {
    return this.newsService.search(name);
  }
}
