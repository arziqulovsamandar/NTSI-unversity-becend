import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model,HasMany } from 'sequelize-typescript';
import { Img } from 'src/img/models/news.model';

interface NewsAttrs {
  text: string;
}

@Table({ tableName: 'NewsEn' })
export class NewsEn extends Model<NewsEn, NewsAttrs> {
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
  text: string;

  @HasMany(() => Img)
  img: Img[];
}
