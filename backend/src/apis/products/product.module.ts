import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Tag } from '../tags/entities/tag.entity';
import { Image } from '../images/entities/image.entity';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SubCategory } from '../subCategories/entities/subCategory.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      Tag,
      Image,
      SubCategory,
      User,
    ]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}
