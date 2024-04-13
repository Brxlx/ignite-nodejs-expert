import { Either, left, right } from '@/core/types/either';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface DeleteAnswerOnCommentRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerOnCommentResponse = Either<ResourceNotFoundError | NotAllowedError, object>;

export class DeleteAnswerOnCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  public async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerOnCommentRequest): Promise<DeleteAnswerOnCommentResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) return left(new ResourceNotFoundError());

    if (answerComment.authorId.toString() !== authorId) return left(new NotAllowedError());

    await this.answerCommentsRepository.delete(answerComment);

    return right({});
  }
}
