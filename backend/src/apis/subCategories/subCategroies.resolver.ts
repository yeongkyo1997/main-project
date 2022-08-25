import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SubCategoriesService } from './subCategories.service';
import { SubCategory } from './entities/subCategory.entity';

@Resolver()
export class SubCategoriesResolver {
  constructor(
    private readonly subCategoriesService: SubCategoriesService, //
  ) {}

  @Mutation(() => SubCategory)
  createSubCategory(
    @Args('subCategory') subCategory: string, //
    @Args('mainCategory') mainCategory: string,
  ) {
    return this.subCategoriesService.createSubCategory({
      subCategory,
      mainCategory,
    });
  }
}
