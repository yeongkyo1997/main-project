import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './entities/subCategory.entity';
import { Repository } from 'typeorm';
import { MainCategory } from '../mainCategories/entities/mainCategory.entity';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,

    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
  ) {}

  async createSubCategory({ subCategory, mainCategory }) {
    const mainCategoryEntity = await this.mainCategoryRepository.findOne({
      where: { id: mainCategory },
    });

    const newSubCategory = this.subCategoryRepository.create({
      name: subCategory,
      mainCategory: mainCategoryEntity,
    });

    return this.subCategoryRepository.save(newSubCategory);
  }
}
