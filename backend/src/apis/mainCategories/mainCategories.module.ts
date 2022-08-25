import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategory } from './entities/mainCategory.entity';
import { MainCategoriesResolver } from './mainCategories.resolver';
import { MainCategoriesService } from './mainCategories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MainCategory, //
    ]),
  ],
  providers: [
    MainCategoriesResolver, //
    MainCategoriesService,
  ],
})
export class MainCategoriesModule {}
