import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface DeleteQuestionOnCommentRequest {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionOnCommentResponse {}

export class DeleteQuestionOnCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  public async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionOnCommentRequest): Promise<DeleteQuestionOnCommentResponse> {
    const questionComment = await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComment) throw new Error('Question comment not found.');

    if (questionComment.authorId.toString() !== authorId) throw new Error('Author Not allowed.');

    await this.questionCommentsRepository.delete(questionComment);

    return {};
  }
}
