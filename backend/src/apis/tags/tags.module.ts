import { Module } from '@nestjs/common';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tag, //
      Product,
    ]),
  ],
  providers: [
    TagsResolver, //
    TagsService,
  ],
})
export class TagsModule {}
