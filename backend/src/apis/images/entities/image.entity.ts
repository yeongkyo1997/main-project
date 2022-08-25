import { Field } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  url: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isMain: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;
}
