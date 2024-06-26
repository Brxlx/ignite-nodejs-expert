import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { Either, left, right } from '@/core/types/either';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface GetQuestionBySlugRequest {
  slug: string;
}

type GetQuestionBySlugResponse = Either<ResourceNotFoundError, { question: Question }>;

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute({ slug }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) return left(new ResourceNotFoundError());

    return right({ question });
  }
}
