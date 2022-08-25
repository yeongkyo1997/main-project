import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MainCategoriesService } from './mainCategories.service';
import { MainCategory } from './entities/mainCategory.entity';

@Resolver()
export class MainCategoriesResolver {
  constructor(
    private readonly mainCategoriesService: MainCategoriesService, //
  ) {}

  @Mutation(() => MainCategory)
  createMainCategory(
    @Args('name') name: string, //
  ) {
    return this.mainCategoriesService.createMainCategory({
      name,
    });
  }
}
