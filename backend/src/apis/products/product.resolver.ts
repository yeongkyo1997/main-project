import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Inject, CACHE_MANAGER, ConflictException } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService, //

    private readonly elasticsearchService: ElasticsearchService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManger: Cache,
  ) {}

  //////////////////////////////// QUERY ////////////////////////////////
  // 전체 조회
  @Query(() => [Product])
  async fetchProducts(
    @Args({ name: 'search', nullable: true }) search: string,
  ) {
    // 검색어가 없다면 모든 상품을 보여준다.
    if (!search) return this.productService.findAll();

    // 검색어가 1글자 이하라면 에러를 발생시킨다.
    if (search.length <= 1)
      throw new ConflictException('검색어는 2글자 이상 입력해주세요.');

    // 검색어에 공백만 있다면 에러를 발생시킨다.
    if (search.trim().length === 0)
      throw new ConflictException('검색어는 공백만 입력할 수 없습니다.');

    // redis에서 검색어가 저장되어있는지 확인
    const cache: Array<Product> = await this.cacheManger.get(search);
    if (cache) {
      return cache;
    }

    // elasticsearch에서 검색어로 검색
    const queryResult = await this.elasticsearchService.search({
      index: 'myproduct',
      query: {
        bool: {
          must: [{ term: { name: search } }],
        },
      },
    });

    // 최신 정보를 result에 저장
    // softDelete 처리
    const result = queryResult.hits.hits
      .map((hit) => {
        return hit._source;
      })
      .filter((v) => {
        return v['deletedAt'] === null;
      });

    // cache에 저장
    await this.cacheManger.set(search, result, { ttl: 10 });

    return result;
  }

  // 하나만 조회
  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.findOne({ productId });
  }

  // 삭제된 상품 포함 전부 조회
  @Query(() => [Product])
  fetchProductWithDeleted() {
    return this.productService.findWithDelete();
  }

  //////////////////////////////// MUTATION ////////////////////////////////
  // 생성
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') //
    createProductInput: CreateProductInput, //
  ) {
    return this.productService.create({ createProductInput });
  }

  // 수정
  @Mutation(() => Product)
  async updateProduct(
    @Args('id') productId: string,
    @Args('updateProductInput') //
    updateProductInput: UpdateProductInput,
  ) {
    await this.productService.checkSale({ productId });

    return this.productService.update({ productId, updateProductInput });
  }

  // 삭제
  @Mutation(() => Boolean)
  deleteProduct(
    @Args('id') productId: string, //
  ) {
    return this.productService.delete({ productId });
  }

  // 삭제된 상품 복구
  @Mutation(() => Boolean)
  restoreProduct(@Args('id') productId: string) {
    return this.productService.retoreDeleted({ productId });
  }
}
