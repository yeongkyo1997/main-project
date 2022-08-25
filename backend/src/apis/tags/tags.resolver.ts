import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TagsService } from './tags.service';

@Resolver()
export class TagsResolver {
  constructor(
    private readonly tagsService: TagsService, //
  ) {}

  @Mutation(() => String)
  async createTag(
    @Args('name') name: string, //
    @Args('productId') productId: string,
  ) {
    return await this.tagsService.createTag({ name, productId });
  }
}
