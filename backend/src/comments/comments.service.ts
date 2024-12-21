import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Tour } from 'src/tours/entities/tour.entity';
import { Image } from 'src/images/entities/image.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { authorId, tourId, content, imageUrls } = createCommentDto;

    const author = await this.userRepository.findOne({
      where: { id: authorId },
    });
    if (!author) {
      throw new NotFoundException(`User with ID ${authorId} not found`);
    }

    const tour = await this.tourRepository.findOne({ where: { id: tourId } });
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${tourId} not found`);
    }

    const comment = this.commentRepository.create({
      content,
      author,
      tour,
    });

    await this.commentRepository.save(comment);

    if (imageUrls && imageUrls.length > 0) {
      const images = imageUrls.map((url) =>
        this.imageRepository.create({
          url,
          entityType: 'comment',
          entityId: comment.id,
        }),
      );
      await this.imageRepository.save(images);
    }

    return this.commentRepository.findOne({
      where: { id: comment.id },
      relations: ['author', 'tour'],
    });
  }

  async findAll(): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      relations: ['author', 'tour'],
    });

    for (const comment of comments) {
      const images = await this.imageRepository.find({
        where: { entityType: 'comment', entityId: comment.id },
      });
      (comment as any).images = images;
    }

    return comments;
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author', 'tour'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    const images = await this.imageRepository.find({
      where: { entityType: 'comment', entityId: id },
    });

    (comment as any).images = images;

    return comment;
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const { content, imageUrls } = updateCommentDto;

    const comment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    comment.content = content ?? comment.content;
    if (imageUrls) {
      await this.imageRepository.delete({
        entityType: 'comment',
        entityId: id,
      });

      const newImages = imageUrls.map((url) =>
        this.imageRepository.create({
          url,
          entityType: 'comment',
          entityId: id,
        }),
      );
      await this.imageRepository.save(newImages);
    }

    return this.commentRepository.save(comment);
  }

  async remove(id: string): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    await this.imageRepository.delete({ entityType: 'comment', entityId: id });
    await this.commentRepository.remove(comment);
  }
}
