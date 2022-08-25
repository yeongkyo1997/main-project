import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MainCategory } from './entities/mainCategory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MainCategoriesService {
  constructor(
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
  ) {}

  async createMainCategory({ name }) {
    const result = this.mainCategoryRepository.create({ name });
    return await this.mainCategoryRepository.save(result);
  }
}
