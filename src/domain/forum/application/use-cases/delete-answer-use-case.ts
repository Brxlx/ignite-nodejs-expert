import { Either, left, right } from '@/core/types/either';
import { AnswersRepository } from '../repositories/answers-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/not-allowed-error';

interface DeleteAnswerRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerResponse = Either<ResourceNotFoundError | NotAllowedError, object>;

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ authorId, answerId }: DeleteAnswerRequest): Promise<DeleteAnswerResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError());

    if (authorId !== answer.authorId.toString()) return left(new NotAllowedError());

    await this.answersRepository.delete(answer);

    return right({});
  }
}
