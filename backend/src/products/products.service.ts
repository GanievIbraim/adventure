import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    userId: string,
  ): Promise<Product> {
    const guide = await this.usersService.findOneById(userId);
    if (!guide) {
      throw new HttpException('Guide not found', HttpStatus.NOT_FOUND);
    }

    const product = this.productRepository.create({
      guide,
      ...createProductDto,
    });
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    userId: string,
  ): Promise<Product> {
    const guide = await this.usersService.findOneById(userId);
    if (!guide) {
      throw new HttpException('Guide not found', HttpStatus.NOT_FOUND);
    }

    const product = await this.findOne(id);
    if (product.guide != guide) {
      throw new HttpException(
        'Forbidden: You do not own this tour',
        HttpStatus.FORBIDDEN,
      );
    }
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: string, userId: string): Promise<void> {
    const guide = await this.usersService.findOneById(userId);
    if (!guide) {
      throw new HttpException('Guide not found', HttpStatus.NOT_FOUND);
    }

    const product = await this.findOne(id);
    if (product.guide != guide) {
      throw new HttpException(
        'Forbidden: You do not own this tour',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.productRepository.remove(product);
  }
}
