import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface DeleteAnswerOnCommentRequest {
  authorId: string;
  answerCommentId: string;
}

interface DeleteAnswerOnCommentResponse {}

export class DeleteAnswerOnCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  public async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerOnCommentRequest): Promise<DeleteAnswerOnCommentResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) throw new Error('Answer comment not found.');

    if (answerComment.authorId.toString() !== authorId) throw new Error('Author Not allowed.');

    await this.answerCommentsRepository.delete(answerComment);

    return {};
  }
}
