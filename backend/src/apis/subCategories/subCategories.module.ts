import { Module } from '@nestjs/common';
import { SubCategoriesResolver } from './subCategroies.resolver';
import { SubCategoriesService } from './subCategories.service';
import { SubCategory } from './entities/subCategory.entity';
import { MainCategory } from '../mainCategories/entities/mainCategory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubCategory, //
      MainCategory,
    ]),
  ],
  providers: [
    SubCategoriesResolver, //
    SubCategoriesService,
  ],
})
export class SubCategoriesModule {}
