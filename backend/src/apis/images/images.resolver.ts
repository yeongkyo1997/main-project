import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ImagesService } from './images.service';

@Resolver()
export class ImagesResolver {
  constructor(
    private readonly imageService: ImagesService, //
  ) {}

  @Mutation(() => [String])
  async uploadImage(
    @Args({ name: 'urls', type: () => [GraphQLUpload] }) urls: FileUpload[],
    @Args('product') product: string,
  ) {
    return await this.imageService.create({ product, urls });
  }

  @Mutation(() => [String])
  async updateImage(
    @Args({ name: 'urls', type: () => [GraphQLUpload] }) urls: FileUpload[],
    @Args('product') product: string,
  ) {
    return await this.imageService.update({ product, urls });
  }
}
