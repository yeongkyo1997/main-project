import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true, type: 'varchar', length: 100 })
  @Field(() => String)
  name: string;

  @ManyToMany(() => Product, (products) => products.tags)
  @Field(() => [Product])
  products: Product[];
}
