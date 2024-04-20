import { PartialType } from '@nestjs/swagger';
import { CreateNewsimgDto } from './create-img.dto';

export class UpdateNewsImgDto extends PartialType(CreateNewsimgDto) {}
