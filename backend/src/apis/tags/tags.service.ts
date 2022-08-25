import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async createTag({ name, productId }) {
    const products = await this.productsRepository.find({
      where: { id: productId },
    });

    const result = await this.tagsRepository.save({
      name,
      products,
    });

    return result;
  }
}
