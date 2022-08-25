import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Tag } from '../tags/entities/tag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    private readonly connection: Connection,
  ) {}

  ////////////////////////////////QUERY//////////////////////////////////////
  findAll() {
    return this.productRepository.find({
      relations: ['subCategory', 'user', 'tags'],
    });
  }

  findOne({ productId }) {
    return this.productRepository.findOne({
      where: { id: productId }, //
      relations: ['subCategory', 'user', 'tags'],
    });
  }

  findWithDelete() {
    return this.productRepository.find({
      withDeleted: true,
      relations: ['subCategory', 'user', 'tags'],
    });
  }

  /////////////////////////////////MUTATION////////////////////////////////////
  async create({ createProductInput }) {
    const { subCategoryId, userId, tags, ...product } = createProductInput;

    // tags를 저장하기 위해서는 먼저 tag를 저장해야 한다.
    // 존재하는 tag를 찾아서 저장하고, 없으면 새로 생성한다.
    const addTags = [];
    for (const tag of tags) {
      const tagName = tag.replace('#', '');
      const prevTag = await this.tagRepository.findOne({
        where: { name: tagName },
      });
      if (prevTag) {
        addTags.push(prevTag);
      } else {
        const newTag = await this.tagRepository.save({
          name: tagName,
        });
        addTags.push(newTag);
      }
    }
    const result = await this.productRepository.save({
      ...product,
      subCategory: { id: subCategoryId },
      user: { id: userId },
      tags: addTags,
    });

    return result;
  }

  async update({ productId, updateProductInput }) {
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    const result = this.productRepository.save({
      ...myproduct,
      id: productId,
      ...updateProductInput,
    });
    return result;
  }

  async checkSale({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (product.price === -1) {
      throw new UnprocessableEntityException('준비중인 상품입니다.');
    }
  }

  async delete({ productId }) {
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }

  async retoreDeleted({ productId }) {
    const result = await this.productRepository.restore(
      { id: productId }, //
    );
    return result.affected ? true : false;
  }
}
