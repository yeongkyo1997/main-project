import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { FilesService } from '../files/files.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>, //
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    private readonly filesService: FilesService,
  ) {}

  async create({ urls, product }) {
    const _product = await this.productsRepository.findOne({
      where: { id: product },
    });

    if (!_product) {
      throw new UnprocessableEntityException('상품이 존재하지 않습니다.');
    }

    const files = await Promise.all(urls);

    const results = await this.filesService.upload({ files });

    const ret = await Promise.all(
      results.map((el) => {
        const saveData = new Promise(async (resolve) => {
          const result = await this.imagesRepository.save({
            url: el.toString(),
            product: _product,
          });
          resolve(result.url);
        });
        return saveData;
      }),
    );

    return ret;
  }

  async update({ urls, product }) {
    const _product = await this.productsRepository.findOne({
      where: { id: product },
    });

    if (!_product) {
      throw new UnprocessableEntityException('상품이 존재하지 않습니다.');
    }

    const tempImages = (
      await this.imagesRepository.find({
        where: { product: _product },
      })
    ).map((el) => el.url);

    const filterImages = (await Promise.all(urls)).filter((el) => {
      return tempImages.indexOf(`${process.env.BUCKET_NAME}/${el.filename}`) ===
        -1
        ? true
        : false;
    });

    const filter = await Promise.all(
      filterImages.map((el) => {
        const deleteData = new Promise((resolve) => {
          const result = this.imagesRepository.softDelete({
            url: `${process.env.BUCKET_NAME}/${el.filename}`,
          });
          resolve(result);
        });
        return deleteData;
      }),
    );

    return await Promise.all(
      filter.map((el) => {
        const saveData = new Promise(async (resolve) => {
          const result = await this.imagesRepository.save({
            url: el.toString(),
            product: _product,
          });
          resolve(result.url);
        });
        return saveData;
      }),
    );
  }
}
