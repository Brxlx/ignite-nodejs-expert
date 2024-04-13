import { Either, left, right } from '@/core/types/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface EditAnswerRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type EditAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ authorId, answerId, content }: EditAnswerRequest): Promise<EditAnswerResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError());

    if (authorId !== answer.authorId.toString()) return left(new NotAllowedError());

    answer.content = content;

    await this.answersRepository.save(answer);

    return right({ answer });
  }
}
