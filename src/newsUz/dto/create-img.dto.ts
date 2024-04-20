import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewsimgDto {
  @ApiProperty({
    example: 'Unversiteda qabul',
    description: 'News ru',
  })
  @IsNotEmpty()
  @IsString()
  text: string;
}
