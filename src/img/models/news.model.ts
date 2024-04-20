import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { NewsEn } from 'src/newsEn/models/news.model';
import { NewsRu } from 'src/newsRu/models/news.model';
import { NewsUz } from 'src/newsUz/models/news.model';

interface ImgAttrs {
  url: string;
  text_uz: number;
  text_ru: number;
  text_en: number;
}

@Table({ tableName: 'Img' })
export class Img extends Model<Img, ImgAttrs> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Unversitetda qabul', description: 'News name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;

  @ForeignKey(() => NewsUz)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  text_uz: number;

  @BelongsTo(() => NewsUz,'text_uz')
  newsUz: NewsUz;

  @ForeignKey(() => NewsRu)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  text_ru: number;

  @BelongsTo(() => NewsRu)
  newsRu: NewsRu;

  @ForeignKey(() => NewsEn)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  text_en: number;

  @BelongsTo(() => NewsEn)
  newsEn: NewsEn;
}
