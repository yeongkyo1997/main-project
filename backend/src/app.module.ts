import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auths/auth.module';
import { PaymentsModule } from './apis/payments/payments.module';
import { ImagesModule } from './apis/images/images.module';
import { FilesModule } from './apis/files/files.module';
import { ProductModule } from './apis/products/product.module';
import { SubCategoriesModule } from './apis/subCategories/subCategories.module';
import { MainCategoriesModule } from './apis/mainCategories/mainCategories.module';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    AuthModule,
    ImagesModule,
    FilesModule,
    PaymentsModule,
    MainCategoriesModule,
    SubCategoriesModule,
    ProductModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my-redis:6379',
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
