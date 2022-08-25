import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Product } from '../products/entities/product.entity';
import { Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesResolver } from './images.resolver';
import { FilesService } from '../files/files.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Image, //
      Product,
    ]),
  ],
  providers: [
    ImagesResolver, //
    ImagesService,
    FilesService,
  ],
})
export class ImagesModule {}
