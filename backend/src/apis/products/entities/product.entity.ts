import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { SubCategory } from 'src/apis/subCategories/entities/subCategory.entity';
import { Tag } from 'src/apis/tags/entities/tag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  name: string;

  @Column({ type: 'int', unsigned: true })
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  level: string;

  @Column({ type: 'float', unsigned: true })
  @Field(() => Float)
  starRate: number;

  @Column()
  @Field(() => String)
  description: string;

  @Column({ default: true })
  @Field(() => Boolean)
  isDiploma: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => SubCategory)
  @Field(() => SubCategory)
  subCategory: SubCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  // @ManyToOne(() => Payment)
  // @Field(() => Payment)
  // payment: Payment;

  @JoinTable()
  @ManyToMany(() => Tag, (tags) => tags.products)
  @Field(() => [Tag])
  tags: Tag[];
}
