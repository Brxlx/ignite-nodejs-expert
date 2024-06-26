import { Either, left, right } from '@/core/types/either';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/not-allowed-error';

interface DeleteQuestionOnCommentRequest {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionOnCommentResponse = Either<ResourceNotFoundError | NotAllowedError, null>;

export class DeleteQuestionOnCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  public async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionOnCommentRequest): Promise<DeleteQuestionOnCommentResponse> {
    const questionComment = await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComment) return left(new ResourceNotFoundError());

    if (questionComment.authorId.toString() !== authorId) return left(new NotAllowedError());

    await this.questionCommentsRepository.delete(questionComment);

    return right(null);
  }
}
