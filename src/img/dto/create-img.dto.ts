import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNewsimgDto {
  @ApiProperty({
    example: 'Unversiteda qabul',
    description: 'News ru',
  })
  @IsString()
  url: string;

  @ApiProperty({ example: '1', description: 'Product id' })
  @IsNumber()
  text_uz: number;

  @ApiProperty({ example: '1', description: 'Product id' })
  @IsNumber()
  text_ru: number;

  @ApiProperty({ example: '1', description: 'Product id' })
  @IsNumber()
  text_en: number;
}
